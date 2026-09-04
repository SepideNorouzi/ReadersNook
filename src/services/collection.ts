import { apiFetch } from "../lib/apiClient";
import {
  mapApiCollectionDetailToCollectionWithBooks,
  mapApiCollectionListItemToCollection,
  mapCollectionToCreatePayload,
  mapCollectionToUpdatePayload,
} from "../mappers/MapApiToCollection";
import type {
  ApiCollectionAddBookResponse,
  ApiCollectionDetail,
  ApiCollectionListItem,
  ApiCollectionUpdateResponse,
} from "../types/api/apiCollection";
import type { Collection, CollectionWithBooks } from "../types/collection";

// ─────────────────────────────────────────────
// GET COLLECTIONS (books always nested)

// ─────────────────────────────────────────────
export async function getCollections(): Promise<Collection[]> {
  const apiCollections =
    await apiFetch<ApiCollectionListItem[]>("/collections/");
  return apiCollections.map(mapApiCollectionListItemToCollection);
}

// GET /collections/{id}/ — detail, hydrated books
export async function getCollectionDetail(
  collectionId: string,
): Promise<CollectionWithBooks> {
  const apiCollection = await apiFetch<ApiCollectionDetail>(
    `/collections/${collectionId}/`,
  );
  return mapApiCollectionDetailToCollectionWithBooks(apiCollection);
}

// ─────────────────────────────────────────────
// CREATE COLLECTION
// ─────────────────────────────────────────────
export async function createCollection(name: string): Promise<Collection> {
  const apiCollection = await apiFetch<ApiCollectionListItem>(
    "/collections/create/",
    { method: "POST", body: mapCollectionToCreatePayload(name) },
  );
  return mapApiCollectionListItemToCollection(apiCollection);
}

// ─────────────────────────────────────────────
// RENAME COLLECTION
// ─────────────────────────────────────────────
export async function renameCollection(
  collectionId: string,
  name: string,
): Promise<void> {
  await apiFetch<ApiCollectionUpdateResponse>(
    `/collections/${collectionId}/update/`,
    { method: "PATCH", body: mapCollectionToUpdatePayload({ name }) },
  );
}

// ─────────────────────────────────────────────
// ADD BOOK TO COLLECTION
// ─────────────────────────────────────────────

// POST /collections/{id}/books/{book_pk}/ — id in URL, no body
export async function addBookToCollection(
  collectionId: string,
  bookId: string,
): Promise<ApiCollectionAddBookResponse> {
  return apiFetch<ApiCollectionAddBookResponse>(
    `/collections/${collectionId}/books/${bookId}/`,
    { method: "POST" },
  );
}

// ─────────────────────────────────────────────
// REMOVE BOOK FROM COLLECTION
// ─────────────────────────────────────────────
// DELETE /collections/{id}/books/{book_pk}/ — 204, no body
export async function removeBookFromCollection(
  collectionId: string,
  bookId: string,
): Promise<void> {
  await apiFetch<void>(`/collections/${collectionId}/books/${bookId}/`, {
    method: "DELETE",
  });
}

// ─────────────────────────────────────────────
// DELETE COLLECTION
// ─────────────────────────────────────────────
export async function deleteCollection(collectionId: string): Promise<void> {
  await apiFetch<void>(`/collections/${collectionId}/update/`, {
    method: "DELETE",
  });
}
