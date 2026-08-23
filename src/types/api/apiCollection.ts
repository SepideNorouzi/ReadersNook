import type { ApiBookSummary } from "./apiBook";

type ApiCollectionCore = {
  id: number;
  name: string;
  description: string;
};

// Every one of these returns the FULL collection with books nested
export type ApiCollectionSummary = ApiCollectionCore & {
  books: ApiBookSummary[];
  created_at: string;
  updated_at: string;
};

export type ApiCollectionCreatePayload = Pick<
  ApiCollectionCore,
  "name" | "description"
>;

export type ApiCollectionUpdatePayload = Partial<ApiCollectionCreatePayload>;

export type ApiCollectionAddBookPayload = { book_id: number };
export type ApiCollectionRemoveBookPayload = { book_id: number };
