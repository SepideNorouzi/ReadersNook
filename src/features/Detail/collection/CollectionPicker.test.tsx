import { beforeEach, describe, expect, it } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CollectionPicker from "./CollectionPicker";
import type { Book } from "../../../types/book";
import { useCollectionStore } from "../../../store/demoCollectionStore";
import { useBookStore } from "../../../store/demoBookStore";
import { useModeStore } from "../../../store/modeStore";

const mockBook: Book = {
  id: "library-entry-5",
  catalogId: "5",
  title: "Piranesi",
  author: "Susanna Clarke",
  summary: "",
  quotes: [],
  aestheticImages: [],
  coverUrl: "",
  currentPage: 0,
  totalPages: 272,
  status: "tbr",
  rating: 0,
  sourceId: "OL-piranesi",
  addedAt: "2026-09-23T00:00:00.000Z",
};

function renderPicker(book: Book = mockBook) {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={client}>
      <CollectionPicker book={book} />
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  /*
   * These tests use the demo repository.
   */
  useModeStore.getState().setMode("demo");

  useCollectionStore.getState().setCollections([]);

  useBookStore.getState().setBooks([mockBook]);
});

describe("CollectionPicker", () => {
  it("shows existing collections and lets you toggle the book into one", async () => {
    useCollectionStore.getState().setCollections([
      {
        id: "c-cozy",
        name: "Cozy Fantasy",
        bookIds: [],
      },
    ]);

    const user = userEvent.setup();

    renderPicker();

    await user.click(
      screen.getByRole("button", {
        name: /Add to collection/i,
      }),
    );

    const row = await screen.findByRole("menuitemcheckbox", {
      name: /Cozy Fantasy/i,
    });

    expect(row).toBeInTheDocument();

    await user.click(row);

    /*
     * Adding closes the dropdown.
     */
    expect(
      screen.queryByRole("menuitemcheckbox", {
        name: /Cozy Fantasy/i,
      }),
    ).not.toBeInTheDocument();

    /*
     * Re-open to confirm that the
     * collection now contains the book.
     */
    await user.click(
      screen.getByRole("button", {
        name: /Add to collection/i,
      }),
    );

    const selected = await screen.findByRole("menuitemcheckbox", {
      name: /Cozy Fantasy/i,
    });

    expect(within(selected).getByText("Cozy Fantasy")).toHaveClass(
      "font-semibold",
    );

    /*
     * MOST IMPORTANT ASSERTION:
     *
     * The stored collection membership
     * uses the catalog/database book id,
     * not the library-entry id.
     */
    expect(useCollectionStore.getState().collections[0].bookIds).toContain("5");

    expect(useCollectionStore.getState().collections[0].bookIds).not.toContain(
      "library-entry-5",
    );
  });

  it("creates a new collection and adds the catalog book in one action", async () => {
    const user = userEvent.setup();

    renderPicker();

    await user.click(
      screen.getByRole("button", {
        name: /Add to collection/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /New collection/i,
      }),
    );

    const input = screen.getByPlaceholderText("Collection name");

    await user.type(input, "Cozy Fantasy");

    await user.click(
      screen.getByRole("button", {
        name: "Create & add",
      }),
    );

    /*
     * Creation should close both
     * the form and dropdown.
     */
    expect(
      screen.queryByPlaceholderText("Collection name"),
    ).not.toBeInTheDocument();

    const created = useCollectionStore
      .getState()
      .collections.find((collection) => collection.name === "Cozy Fantasy");

    expect(created).toBeDefined();

    expect(created?.bookIds).toContain("5");

    expect(created?.bookIds).not.toContain("library-entry-5");
  });

  it("removes the catalog book from a collection when toggled off", async () => {
    useCollectionStore.getState().setCollections([
      {
        id: "c-cozy",
        name: "Cozy Fantasy",
        /*
         * Notice this is the catalog id.
         * The Book itself has id = library-entry-5.
         */
        bookIds: ["5"],
      },
    ]);

    const user = userEvent.setup();

    renderPicker();

    await user.click(
      screen.getByRole("button", {
        name: /Add to collection/i,
      }),
    );

    const row = await screen.findByRole("menuitemcheckbox", {
      name: /Cozy Fantasy/i,
    });

    /*
     * This is the regression test that
     * catches the old id mismatch.
     *
     * The collection contains catalog id "5",
     * while the Book's library id is
     * "library-entry-5".
     *
     * The row must still be recognized
     * as selected.
     */
    expect(within(row).getByText("Cozy Fantasy")).toHaveClass("font-semibold");

    await user.click(row);

    /*
     * Removing uses the catalog id.
     */
    expect(useCollectionStore.getState().collections[0].bookIds).not.toContain(
      "5",
    );

    expect(useCollectionStore.getState().collections[0].bookIds).not.toContain(
      "library-entry-5",
    );

    /*
     * Removing keeps the menu open.
     */
    expect(
      screen.getByRole("menuitemcheckbox", {
        name: /Cozy Fantasy/i,
      }),
    ).toBeInTheDocument();
  });
});
