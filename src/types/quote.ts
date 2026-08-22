export interface Quote {
  id: string;
  text: string;
  page: number;
  favorite: boolean;
  createdAt?: string;
  updatedAt?: string;
  bookId: string;
  createdBy: string; // NEW — FK to the user who created the quote
}

export type QuoteDraft = {
  text: string;
  page: number;
};

export type QuoteChanges = Partial<Pick<Quote, "text" | "page" | "favorite">>;
