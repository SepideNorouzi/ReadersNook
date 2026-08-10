// ---- 1. The RAW shape Google actually sends back. ----
// Deliberately full of optional fields — Google's data is inconsistent
// (some volumes have no thumbnail, no description, no page count, etc).
// This type exists ONLY so the service layer can safely read the response.
export type GoogleVolume = {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
    averageRating?: number;
  };
};

export type GoogleBooksResponse = {
  totalItems: number;
  items?: GoogleVolume[]; // absent entirely if there are 0 results
};

// ---- 2. The NORMALIZED shape the app actually works with. ----
// This is what components, hooks, everything downstream sees.
export type BookSearchResult = {
  googleId: string;
  title: string;
  author: string;
  coverUrl: string | null; // explicit null > undefined, forces you to handle "no cover"
  description: string; // falls back to "" if Google sends none
  publishedDate?: string;
  pageCount?: number;
  categories: string[]; // falls back to [] instead of undefined
  averageRating?: number; // Google's public rating
};
