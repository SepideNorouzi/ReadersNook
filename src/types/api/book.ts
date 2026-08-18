// The exact wire shape Django sends/expects.
export type ApiBookStatus = "current" | "tbr" | "read";

export type ApiBook = {
  id: number;
  title: string;
  author: string;
  summary: string;
  cover_url: string;
  current_page: number;
  total_pages: number;
  status: ApiBookStatus;
  rating: number;
  created_at: string;
  updated_at: string;
};

// Body shape for POST /books/create/ and PUT/PATCH /books/{id}/update/
export type ApiBookPayload = Omit<ApiBook, "id" | "created_at" | "updated_at">;
