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
