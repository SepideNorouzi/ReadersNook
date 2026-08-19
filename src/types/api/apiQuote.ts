export type ApiQuote = {
  id: number;
  text: string;
  page: number;
  favorite: boolean;
  created_at: string;
  updated_at: string;
  book: number; // which book this quote belongs to
  created_by: number;
};

// What create/update actually send. Not the same shape as ApiQuote
export type ApiQuotePayload = {
  text: string;
  page: number;
  favorite: boolean;
  book: number;
};
