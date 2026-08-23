import { it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CollectionPicker from "./CollectionPicker";
import type { Book } from "../../../types/book";
import { resetCollectionsDb } from "../../../data/handlers";
import { mockApiCollection } from "../../../test/fixtures";

const mockBook = { id: "5", title: "Piranesi" } as Book;

function renderPicker() {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <CollectionPicker book={mockBook} />
    </QueryClientProvider>,
  );
}

beforeEach(() => resetCollectionsDb());

it("shows existing collections and lets you toggle the book into one", async () => {
  resetCollectionsDb([
    mockApiCollection({ id: 1, name: "Cozy Fantasy", books: [] }),
  ]);
  const user = userEvent.setup();
  renderPicker();

  await user.click(screen.getByText("Add to collection"));
  expect(await screen.findByText("Cozy Fantasy")).toBeInTheDocument();

  await user.click(screen.getByText("Cozy Fantasy"));
  expect(await screen.findByText("Cozy Fantasy")).toHaveClass("font-semibold"); // now selected
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

  // handleCreate closes the dropdown on success — a real behavioral
  // assertion, not a guess about whether the request "probably" worked
  await screen.findByText("Add to collection"); // dropdown collapsed back
  expect(
    screen.queryByPlaceholderText("Collection name"),
  ).not.toBeInTheDocument();
});
