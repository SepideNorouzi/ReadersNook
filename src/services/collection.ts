import { apiFetch } from "../lib/apiClient";
import {
  mapApiCollectionToCollectionWithBooks,
  mapCollectionToCreatePayload,
  mapCollectionToUpdatePayload,
} from "../mappers/MapApiToCollection";
import type { CollectionWithBooks } from "../types/collection";
import type {
  ApiCollectionSummary,
  ApiCollectionAddBookPayload,
  ApiCollectionRemoveBookPayload,
} from "../types/api/apiCollection";

// ─────────────────────────────────────────────
// GET COLLECTIONS (books always nested)
// ─────────────────────────────────────────────
export async function getCollectionsWithBooks(): Promise<
  CollectionWithBooks[]
> {
  const apiCollections =
    await apiFetch<ApiCollectionSummary[]>("/collections/");
  return apiCollections.map(mapApiCollectionToCollectionWithBooks);
}

// ─────────────────────────────────────────────
// CREATE COLLECTION
// ─────────────────────────────────────────────
export async function createCollection(
  name: string,
): Promise<CollectionWithBooks> {
  const apiCollection = await apiFetch<ApiCollectionSummary>(
    "/collections/create/",
    { method: "POST", body: mapCollectionToCreatePayload(name) },
  );
  return mapApiCollectionToCollectionWithBooks(apiCollection);
}

// ─────────────────────────────────────────────
// RENAME COLLECTION
// ─────────────────────────────────────────────
export async function renameCollection(
  collectionId: string,
  name: string,
): Promise<CollectionWithBooks> {
  const apiCollection = await apiFetch<ApiCollectionSummary>(
    `/collections/${collectionId}/update/`,
    { method: "PATCH", body: mapCollectionToUpdatePayload({ name }) },
  );
  return mapApiCollectionToCollectionWithBooks(apiCollection);
}

// ─────────────────────────────────────────────
// ADD BOOK TO COLLECTION
// ─────────────────────────────────────────────
export async function addBookToCollection(
  collectionId: string,
  bookId: string,
): Promise<CollectionWithBooks> {
  const payload: ApiCollectionAddBookPayload = { book_id: Number(bookId) };
  const apiCollection = await apiFetch<ApiCollectionSummary>(
    `/collections/${collectionId}/add-book/`,
    { method: "POST", body: payload },
  );
  return mapApiCollectionToCollectionWithBooks(apiCollection);
}

// ─────────────────────────────────────────────
// REMOVE BOOK FROM COLLECTION
// ─────────────────────────────────────────────
export async function removeBookFromCollection(
  collectionId: string,
  bookId: string,
): Promise<CollectionWithBooks> {
  const payload: ApiCollectionRemoveBookPayload = { book_id: Number(bookId) };
  const apiCollection = await apiFetch<ApiCollectionSummary>(
    `/collections/${collectionId}/remove-book/`,
    { method: "POST", body: payload },
  );
  return mapApiCollectionToCollectionWithBooks(apiCollection);
}

// ─────────────────────────────────────────────
// DELETE COLLECTION
// ─────────────────────────────────────────────
export async function deleteCollection(collectionId: string): Promise<void> {
  await apiFetch<void>(`/collections/${collectionId}/update/`, {
    method: "DELETE",
  });
}
