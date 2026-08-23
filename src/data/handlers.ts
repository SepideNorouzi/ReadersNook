import { http, HttpResponse } from "msw";
import { mockApiCollection } from "../test/fixtures";
import type { ApiCollectionSummary } from "../types/api/apiCollection";

let collectionsDb: ApiCollectionSummary[] = [];

// call this in a test's beforeEach/afterEach to reset state between tests
export function resetCollectionsDb(seed: ApiCollectionSummary[] = []) {
  collectionsDb = seed;
}

export const handlers = [
  http.get("/api/collections/", () => HttpResponse.json(collectionsDb)),

  http.post("/api/collections/create/", async ({ request }) => {
    const body = (await request.json()) as {
      name: string;
      description: string;
    };
    const created = mockApiCollection({
      id: collectionsDb.length + 1,
      name: body.name,
      description: body.description,
    });
    collectionsDb.push(created);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch("/api/collections/:id/update/", async ({ params, request }) => {
    const body = (await request.json()) as Partial<{
      name: string;
      description: string;
    }>;
    const collection = collectionsDb.find((c) => c.id === Number(params.id));
    if (!collection) return new HttpResponse(null, { status: 404 });
    Object.assign(collection, body);
    return HttpResponse.json(collection);
  }),

  http.post("/api/collections/:id/add-book/", async ({ params, request }) => {
    const { book_id } = (await request.json()) as { book_id: number };
    const collection = collectionsDb.find((c) => c.id === Number(params.id));
    if (!collection) return new HttpResponse(null, { status: 404 });
    if (!collection.books.some((b) => b.id === book_id)) {
      collection.books.push(
        mockApiCollection().books[0] ?? ({ id: book_id } as any),
      );
    }
    return HttpResponse.json(collection);
  }),

  http.post(
    "/api/collections/:id/remove-book/",
    async ({ params, request }) => {
      const { book_id } = (await request.json()) as { book_id: number };
      const collection = collectionsDb.find((c) => c.id === Number(params.id));
      if (!collection) return new HttpResponse(null, { status: 404 });
      collection.books = collection.books.filter((b) => b.id !== book_id);
      return HttpResponse.json(collection);
    },
  ),
];
