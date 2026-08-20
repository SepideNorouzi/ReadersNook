export interface Quote {
  id: string;
  text: string;
  page: number;
  favorite: boolean;
  createdAt?: string; // undefined for quotes nested in GET /books/{id}/
  updatedAt?: string;
  bookId: string;
}
