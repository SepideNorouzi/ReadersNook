import { it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CollectionPicker from "./CollectionPicker";
import type { Book } from "../../../types/book";
import { useCollectionStore } from "../../../store/demoCollectionStore";

const mockBook = { id: "5", title: "Piranesi" } as Book;

function renderPicker(book: Book = mockBook) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <CollectionPicker book={book} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  useCollectionStore.getState().setCollections([]);
});

it("shows existing collections and lets you toggle the book into one", async () => {
  useCollectionStore.getState().setCollections([
    { id: "c-cozy", name: "Cozy Fantasy", bookIds: [] },
  ]);
  const user = userEvent.setup();
  renderPicker();

  await user.click(screen.getByText("Add to collection"));
  const row = await screen.findByRole("button", { name: /Cozy Fantasy/ });
  expect(row).toBeInTheDocument();

  await user.click(row);

  // Dropdown closes on add — re-open to confirm the book stuck.
  await user.click(screen.getByText("Add to collection"));
  const selected = await screen.findByRole("button", { name: /Cozy Fantasy/ });
  expect(within(selected).getByText("Cozy Fantasy")).toHaveClass(
    "font-semibold",
  );
  expect(useCollectionStore.getState().collections[0].bookIds).toContain("5");
});

it("creates a new collection and adds the book in one action", async () => {
  const user = userEvent.setup();
  renderPicker();

  await user.click(screen.getByText("Add to collection"));
  await user.click(screen.getByText("New collection"));
  await user.type(
    screen.getByPlaceholderText("Collection name"),
    "Cozy Fantasy",
  );
  await user.click(screen.getByText("Create & add"));

  await screen.findByText("Add to collection");
  expect(
    screen.queryByPlaceholderText("Collection name"),
  ).not.toBeInTheDocument();

  const created = useCollectionStore
    .getState()
    .collections.find((collection) => collection.name === "Cozy Fantasy");
  expect(created).toBeDefined();
  expect(created?.bookIds).toContain("5");
});

it("removes a book from a collection when you toggle it off", async () => {
  useCollectionStore.getState().setCollections([
    { id: "c-cozy", name: "Cozy Fantasy", bookIds: ["5"] },
  ]);
  const user = userEvent.setup();
  renderPicker();

  await user.click(screen.getByText("Add to collection"));
  await user.click(screen.getByRole("button", { name: /Cozy Fantasy/ }));

  expect(useCollectionStore.getState().collections[0].bookIds).not.toContain(
    "5",
  );
  // Remove keeps the menu open so you can untoggle a few in a row.
  expect(screen.getByRole("button", { name: /Cozy Fantasy/ })).toBeInTheDocument();
});
