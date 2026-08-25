import { it, expect, beforeEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router";
import CollectionPicker from "../../Detail/collection/CollectionPicker";
import CollectionsCard from "./CollectionsCard";
import type { Book } from "../../../types/book";
import { useCollectionStore } from "../../../store/demoCollectionStore";

const piranesi = { id: "1", title: "Piranesi" } as Book;
const hobbit = { id: "4", title: "The Hobbit" } as Book;

function renderFlow(book: Book) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={client}>
      <MemoryRouter>
        <CollectionPicker book={book} />
        <CollectionsCard />
      </MemoryRouter>
    </QueryClientProvider>,
  );
}

beforeEach(() => {
  useCollectionStore.getState().setCollections([]);
});

async function openPickerMenu(user: ReturnType<typeof userEvent.setup>) {
  await user.click(screen.getByText("Add to collection"));
  const newCollection = await screen.findByText("New collection");
  return newCollection.parentElement!.parentElement as HTMLElement;
}

it("creates a collection from the detail picker and shows it on the dashboard", async () => {
  const user = userEvent.setup();
  renderFlow(piranesi);

  expect(screen.getByText("No collections yet")).toBeInTheDocument();

  await user.click(screen.getByText("Add to collection"));
  await user.click(screen.getByText("New collection"));
  await user.type(screen.getByPlaceholderText("Collection name"), "Nightstand");
  await user.click(screen.getByText("Create & add"));

  expect(await screen.findAllByText("Nightstand")).not.toHaveLength(0);
  expect(screen.getAllByText("1 book").length).toBeGreaterThan(0);
});

it("renames a collection from the dashboard modal", async () => {
  useCollectionStore
    .getState()
    .setCollections([
      {
        id: "c-night",
        name: "Nightstand",
        bookIds: ["1"],
      },
    ]);

  const user = userEvent.setup();

  renderFlow(piranesi);

  // Open the collection modal
  await user.click(
    screen.getAllByRole("button", { name: /Nightstand/ })[0],
  );

  // Find the modal
  const dialog = await screen.findByRole("dialog", {
    name: "Nightstand",
  });

  // Make sure the modal initially shows the old name
  expect(
    within(dialog).getByRole("heading", {
      name: "Nightstand",
    }),
  ).toBeInTheDocument();

  // Start renaming
  await user.click(
    within(dialog).getByRole("button", {
      name: "Rename collection",
    }),
  );

  const input = within(dialog).getByDisplayValue("Nightstand");

  await user.clear(input);
  await user.type(input, "Bedside");

  // Save
  await user.click(
    within(dialog).getByRole("button", {
      name: "Save",
    }),
  );

  // IMPORTANT:
  // The collection has changed, so find the updated dialog again.
  const renamedDialog = await screen.findByRole("dialog", {
    name: "Bedside",
  });

  expect(
    within(renamedDialog).getByRole("heading", {
      name: "Bedside",
    }),
  ).toBeInTheDocument();

  // Verify the actual store state too
  expect(useCollectionStore.getState().collections[0].name).toBe(
    "Bedside",
  );
});

it("adds a second book from another detail page and removes one from the modal", async () => {
  useCollectionStore
    .getState()
    .setCollections([{ id: "c-night", name: "Nightstand", bookIds: ["1"] }]);
  const user = userEvent.setup();
  const view = renderFlow(hobbit);

  const menu = await openPickerMenu(user);
  await user.click(within(menu).getByRole("button", { name: /Nightstand/ }));

  expect(useCollectionStore.getState().collections[0].bookIds).toEqual([
    "1",
    "4",
  ]);

  view.unmount();
  renderFlow(piranesi);

  await user.click(screen.getAllByRole("button", { name: /Nightstand/ })[0]);
  const dialog = await screen.findByRole("dialog", { name: "Nightstand" });

  expect(within(dialog).getByText("Piranesi")).toBeInTheDocument();
  expect(within(dialog).getByText("The Hobbit")).toBeInTheDocument();
  expect(within(dialog).getByText("2 Books")).toBeInTheDocument();

  await user.click(
    within(dialog).getByRole("button", {
      name: "Remove Piranesi",
    }),
  );

  expect(useCollectionStore.getState().collections[0].bookIds).toEqual(["4"]);
  expect(await within(dialog).findByText("1 Book")).toBeInTheDocument();
  expect(within(dialog).queryByText("Piranesi")).not.toBeInTheDocument();
});
