import type {
  ApiCollectionCreatePayload,
  ApiCollectionDetail,
  ApiCollectionListItem,
  ApiCollectionUpdatePayload,
} from "../types/api/apiCollection";
import type { Collection, CollectionWithBooks } from "../types/collection";
import { mapApiBookSummaryToBook } from "./MapApiToBook";

export function mapApiCollectionListItemToCollection(
  api: ApiCollectionListItem,
): Collection {
  return {
    id: String(api.id),
    name: api.name,
    description: api.description || undefined,
    bookIds: api.books.map(String),
  };
}

export function mapApiCollectionDetailToCollectionWithBooks(
  api: ApiCollectionDetail,
): CollectionWithBooks {
  return {
    id: String(api.id),
    name: api.name,
    description: api.description || undefined,
    books: api.books.map(mapApiBookSummaryToBook),
  };
}

export function mapCollectionToCreatePayload(
  name: string,
): ApiCollectionCreatePayload {
  return { name, description: "" };
}

export function mapCollectionToUpdatePayload(
  changes: Partial<{ name: string; description: string }>,
): ApiCollectionUpdatePayload {
  return changes;
}
