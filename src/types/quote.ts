export interface Quote {
  id: string;
  text: string;
  page: number;
  favorite: boolean;
  createdAt?: string;
  updatedAt?: string;
  bookId: string;
}

export type QuoteDraft = {
  text: string;
  page: number;
};

export type QuoteChanges = Partial<Pick<Quote, "text" | "page" | "favorite">>;
