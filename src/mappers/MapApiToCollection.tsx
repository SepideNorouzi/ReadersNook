import type { CollectionWithBooks } from "../types/collection";
import type {
  ApiCollectionSummary,
  ApiCollectionCreatePayload,
  ApiCollectionUpdatePayload,
} from "../types/api/apiCollection";
import { mapApiBookSummaryToBook } from "./MapApiToBook";

//  this one function covers every endpoint in apiCollection.ts.
export function mapApiCollectionToCollectionWithBooks(
  apiCollection: ApiCollectionSummary,
): CollectionWithBooks {
  return {
    id: String(apiCollection.id),
    name: apiCollection.name,
    // `description` is genuinely optional on the domain type,
    //  so normalizing the backend's likely ""
    // default into `undefined` here is correct.
    description: apiCollection.description || undefined,
    books: apiCollection.books.map(mapApiBookSummaryToBook),
  };
}

export function mapCollectionToCreatePayload(
  name: string,
  description?: string,
): ApiCollectionCreatePayload {
  return { name, description: description ?? "" };
}

export function mapCollectionToUpdatePayload(
  changes: Partial<Pick<CollectionWithBooks, "name" | "description">>,
): ApiCollectionUpdatePayload {
  const payload: ApiCollectionUpdatePayload = {};
  if (changes.name !== undefined) payload.name = changes.name;
  if (changes.description !== undefined)
    payload.description = changes.description;
  return payload;
}
