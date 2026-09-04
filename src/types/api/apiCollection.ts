import type { ApiBookSummary } from "./apiBook";

type ApiCollectionCore = {
  id: number;
  name: string;
  description: string;
};

export type ApiCollectionCreatePayload = Pick<
  ApiCollectionCore,
  "name" | "description"
> & {
  books?: number[]; // backend lets you pre-seed a new collection with books
};

export type ApiCollectionUpdatePayload = Partial<
  Pick<ApiCollectionCore, "name" | "description">
>;

export type ApiCollectionAddBookResponse = { detail: string };

// GET /collections/ — list view
export type ApiCollectionListItem = ApiCollectionCore & {
  books: number[];
  created_by: number;
  created_at: string;
  updated_at: string;
};

// GET /collections/{id}/ — detail view
export type ApiCollectionDetail = ApiCollectionCore & {
  books: ApiBookSummary[];
  created_by: number;
  created_at: string;
  updated_at: string;
};
