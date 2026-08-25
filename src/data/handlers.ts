import { http, HttpResponse } from "msw";
import { mockApiBook, mockApiCollection } from "../test/fixtures";
import type { ApiCollectionSummary } from "../types/api/apiCollection";

// Must match apiClient's default VITE_API_BASE_URL.
const API = "http://localhost:8000";

let collectionsDb: ApiCollectionSummary[] = [];

export function resetCollectionsDb(seed: ApiCollectionSummary[] = []) {
  collectionsDb = seed;
}

export const handlers = [
  http.get(`${API}/collections/`, () => HttpResponse.json(collectionsDb)),

  http.post(`${API}/collections/create/`, async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      description: string;
    };
    const created = mockApiCollection({
      id: collectionsDb.length + 1,
      name: body.name,
      description: body.description,
      books: [],
    });
    collectionsDb.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch(`${API}/collections/:id/update/`, async ({ params, request }) => {
    const body = (await request.json()) as Partial<{
      name: string;
      description: string;
    }>;
    const collection = collectionsDb.find((c) => c.id === Number(params.id));
    if (!collection) return new HttpResponse(null, { status: 404 });
    Object.assign(collection, body);
    return HttpResponse.json(collection);
  }),

  http.post(`${API}/collections/:id/add-book/`, async ({ params, request }) => {
    const { book_id } = (await request.json()) as { book_id: number };
    const collection = collectionsDb.find((c) => c.id === Number(params.id));
    if (!collection) return new HttpResponse(null, { status: 404 });
    if (!collection.books.some((b) => b.id === book_id)) {
      collection.books.push(mockApiBook({ id: book_id }));
    }
    return HttpResponse.json(collection);
  }),

  http.post(
    `${API}/collections/:id/remove-book/`,
    async ({ params, request }) => {
      const { book_id } = (await request.json()) as { book_id: number };
      const collection = collectionsDb.find((c) => c.id === Number(params.id));
      if (!collection) return new HttpResponse(null, { status: 404 });
      collection.books = collection.books.filter((b) => b.id !== book_id);
      return HttpResponse.json(collection);
    },
  ),
];
