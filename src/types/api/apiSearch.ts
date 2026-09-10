export type ApiSearchResult = {
  external_id: string;
  title: string;
  author: string;
  summary: string;
  cover_url: string;
  total_pages: number;
  in_library: boolean;
};

export type ApiSearchResponse = {
  query: string;
  page: number;
  per_page: number;
  results: ApiSearchResult[];
};
