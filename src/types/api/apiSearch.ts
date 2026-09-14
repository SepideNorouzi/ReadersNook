// Shared shape for a "catalog preview" — used by /search/books/ results
// and the top level of /books/external/{external_id}/
export type ApiCatalogPreview = {
  external_id: string;
  title: string;
  author: string;
  summary: string;
  cover_url: string;
  total_pages: number;
  genres: string[];
  rating: number;
  in_library: boolean;
};

export type ApiSearchResult = ApiCatalogPreview & {
  database_id: number | null;
};

export type ApiSearchResponse = {
  query: string;
  page: number;
  per_page: number;
  results: ApiSearchResult[];
};