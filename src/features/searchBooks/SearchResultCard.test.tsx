import { beforeEach, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import SearchResultCard from "./SearchResultCard";
import { useBookStore } from "../../store/demoBookStore";
import { useModeStore } from "../../store/modeStore";
import type { BookSearchResult } from "../../types/searchResults";

const piranesi: BookSearchResult = {
  externalId: "hardcover:123",
  title: "Piranesi",
  author: "Susanna Clarke",
  summary: "A man lives in a house of infinite rooms.",
  coverUrl: null,
  totalPages: 245,
  inLibrary: true,
};

function renderCard(result: BookSearchResult = piranesi) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(
    <QueryClientProvider client={client}>
      <SearchResultCard result={result} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  useModeStore.getState().setMode("demo");
  useBookStore.getState().setBooks([]);
});

it("lets you add a book in demo even when the search API says it is already in a library", async () => {
  const user = userEvent.setup();
  renderCard();

  const addButton = screen.getByRole("button", { name: /add to library/i });
  expect(addButton).toBeEnabled();

  await user.click(addButton);

  expect(
    await screen.findByRole("button", { name: /added/i }),
  ).toBeDisabled();

  const stored = useBookStore.getState().books;
  expect(stored).toHaveLength(1);
  expect(stored[0].title).toBe("Piranesi");
  expect(stored[0].sourceId).toBe("hardcover:123");
  expect(stored[0].status).toBe("tbr");
});

it("shows Added in demo when the book is already in the local store", () => {
  useBookStore.getState().addBook({
    id: "local-1",
    title: "Piranesi",
    author: "Susanna Clarke",
    summary: "",
    coverUrl: "",
    currentPage: 0,
    totalPages: 245,
    status: "tbr",
    rating: 0,
    quotes: [],
    aestheticImages: [],
    sourceId: "hardcover:123",
  });

  renderCard({ ...piranesi, inLibrary: false });

  expect(screen.getByRole("button", { name: /added/i })).toBeDisabled();
});

it("does not insert a duplicate when Add is clicked twice", async () => {
  const user = userEvent.setup();
  renderCard({ ...piranesi, inLibrary: false });

  await user.click(screen.getByRole("button", { name: /add to library/i }));
  await screen.findByRole("button", { name: /added/i });

  expect(useBookStore.getState().books).toHaveLength(1);
});
