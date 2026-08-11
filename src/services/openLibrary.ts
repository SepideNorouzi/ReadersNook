import type { BookDetails } from "../types/bookDetails";
import { BookApiError, type BookSearchResult } from "../types/searchResults";

const SEARCH_URL = "https://openlibrary.org/search.json";
const WORKS_BASE_URL = "https://openlibrary.org/works";
const COVERS_BASE_URL = "https://covers.openlibrary.org/b/id";

// Only request the fields we map into BookSearchResult. Skipping huge
// lists (ISBNs, edition keys, full subject dumps) keeps payloads small.
const SEARCH_FIELDS = [
  "key",
  "title",
  "author_name",
  "cover_i",
  "first_publish_year",
  "number_of_pages_median",
  "ratings_average",
  "first_sentence",
].join(",");

const MAX_CATEGORIES = 8;

// ---- Raw shapes Open Library actually sends back. ----
// Local to this file on purpose — nothing outside this module should
// ever read `doc.author_name` or `doc.cover_i` directly.
type OpenLibraryDoc = {
  key: string; // e.g. "/works/OL45804W"
  title: string;
  author_name?: string[];
  cover_i?: number;
  first_publish_year?: number;
  number_of_pages_median?: number;
  ratings_average?: number;
  first_sentence?: string | string[];
};

type OpenLibrarySearchResponse = {
  numFound: number;
  docs: OpenLibraryDoc[];
};

type OpenLibraryWorkResponse = {
  description?: string | { value: string };
  subjects?: string[];
};

function pickFirstSentence(
  firstSentence: string | string[] | undefined,
): string {
  if (!firstSentence) return "";
  if (typeof firstSentence === "string") return firstSentence.trim();

  // Prefer an English-looking sentence when OL returns many languages.
  const english = firstSentence.find((s) =>
    /^[\x20-\x7E\u2018\u2019\u201C\u201D—–…]+$/.test(s.trim()),
  );
  return (english ?? firstSentence[0] ?? "").trim();
}

function normalizeDescription(
  description: string | { value: string } | undefined,
): string {
  const raw =
    typeof description === "string"
      ? description
      : (description?.value ?? "");

  return raw
    .replace(/<[^>]+>/g, " ")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

/**
 * Open Library subjects are noisy (reading levels, series keys, awards).
 * Keep a short, human-friendly genre list for the Book.genres field.
 */
function cleanCategories(subjects: string[] | undefined): string[] {
  if (!subjects?.length) return [];

  const cleaned = subjects
    .map((s) => s.trim())
    .filter(Boolean)
    .filter(
      (s) =>
        !s.startsWith("series:") &&
        !s.startsWith("award:") &&
        !/^Reading Level/i.test(s) &&
        !/in fiction$/i.test(s) &&
        s.length < 60,
    );

  return [...new Set(cleaned)].slice(0, MAX_CATEGORIES);
}

function coverUrlFromId(coverId: number | undefined): string | null {
  if (!coverId) return null;
  // "-M" is medium; "-S" and "-L" also exist.
  return `${COVERS_BASE_URL}/${coverId}-M.jpg`;
}

/**
 * Turns one raw Open Library doc into the app's internal search shape.
 */
function mapOpenLibraryDocToSearchResult(
  doc: OpenLibraryDoc,
): BookSearchResult {
  return {
    id: doc.key,
    title: doc.title,
    author: doc.author_name?.join(", ") ?? "Unknown author",
    coverUrl: coverUrlFromId(doc.cover_i),
    // search.json rarely has a full blurb — first sentence is a usable preview.
    // Full description is loaded from the works endpoint when adding a book.
    description: pickFirstSentence(doc.first_sentence),
    publishedDate: doc.first_publish_year?.toString(),
    pageCount: doc.number_of_pages_median,
    categories: [],
    averageRating: doc.ratings_average,
  };
}

/**
 * Hits Open Library's public search endpoint and returns normalized
 * results. Free, no API key, no account.
 */
export async function searchBooks(query: string): Promise<BookSearchResult[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const params = new URLSearchParams({
    q: trimmed,
    fields: SEARCH_FIELDS,
    limit: "20",
  });

  const res = await fetch(`${SEARCH_URL}?${params.toString()}`);

  if (!res.ok) {
    throw new BookApiError(
      `Open Library request failed: ${res.status}`,
      res.status,
    );
  }

  const data: OpenLibrarySearchResponse = await res.json();

  return data.docs.map(mapOpenLibraryDocToSearchResult);
}

/**
 * Fetches work-level catalog details (description + subjects/genres).
 * Used when adding a search result so the book detail page has a real
 * summary and genre list — not empty defaults.
 */
export async function getBookDetails(workKey: string): Promise<BookDetails> {
  const workId = workKey.split("/").filter(Boolean).pop();

  if (!workId) {
    throw new BookApiError("Invalid Open Library work key", 404);
  }

  const res = await fetch(`${WORKS_BASE_URL}/${workId}.json`);

  if (!res.ok) {
    throw new BookApiError(
      `Open Library detail request failed: ${res.status}`,
      res.status,
    );
  }

  const data: OpenLibraryWorkResponse = await res.json();

  return {
    description: normalizeDescription(data.description),
    categories: cleanCategories(data.subjects),
  };
}
