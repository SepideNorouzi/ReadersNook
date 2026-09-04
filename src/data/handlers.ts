import { http, HttpResponse } from "msw";

import { mockApiBook, mockApiCollection } from "../test/fixtures";

import type {
  ApiCollectionDetail,
  ApiCollectionListItem,
} from "../types/api/apiCollection";

const API = "http://localhost:8000";

let collectionsDb: ApiCollectionDetail[] = [];

export function resetCollectionsDb(
  seed: ApiCollectionDetail[] = [],
) {
  collectionsDb = seed;
}

export const handlers = [
  // GET /collections/
  http.get(`${API}/collections/`, () => {
    const collections: ApiCollectionListItem[] = collectionsDb.map(
      ({ books, ...collection }) => ({
        ...collection,
        books: books.map((book) => book.id),
      }),
    );

    return HttpResponse.json(collections);
  }),

  // GET /collections/:id/
  http.get(`${API}/collections/:id/`, ({ params }) => {
    const collection = collectionsDb.find(
      (c) => c.id === Number(params.id),
    );

    if (!collection) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(collection);
  }),

  // POST /collections/create/
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

  // PATCH /collections/:id/update/
  http.patch(
    `${API}/collections/:id/update/`,
    async ({ params, request }) => {
      const body = (await request.json()) as Partial<{
        name: string;
        description: string;
      }>;

      const collection = collectionsDb.find(
        (c) => c.id === Number(params.id),
      );

      if (!collection) {
        return new HttpResponse(null, { status: 404 });
      }

      Object.assign(collection, body);

      return HttpResponse.json(collection);
    },
  ),

  // POST /collections/:id/books/:bookId/
  http.post(
    `${API}/collections/:id/books/:bookId/`,
    ({ params }) => {
      const collection = collectionsDb.find(
        (c) => c.id === Number(params.id),
      );

      if (!collection) {
        return new HttpResponse(null, { status: 404 });
      }

      const bookId = Number(params.bookId);

      if (!collection.books.some((book) => book.id === bookId)) {
        collection.books.push(mockApiBook({ id: bookId }));
      }

      return HttpResponse.json({
        detail: "Book added to collection",
      });
    },
  ),

  // DELETE /collections/:id/books/:bookId/
  http.delete(
    `${API}/collections/:id/books/:bookId/`,
    ({ params }) => {
      const collection = collectionsDb.find(
        (c) => c.id === Number(params.id),
      );

      if (!collection) {
        return new HttpResponse(null, { status: 404 });
      }

      const bookId = Number(params.bookId);

      collection.books = collection.books.filter(
        (book) => book.id !== bookId,
      );

      return new HttpResponse(null, { status: 204 });
    },
  ),

  // DELETE /collections/:id/update/
  http.delete(
    `${API}/collections/:id/update/`,
    ({ params }) => {
      const index = collectionsDb.findIndex(
        (c) => c.id === Number(params.id),
      );

      if (index === -1) {
        return new HttpResponse(null, { status: 404 });
      }

      collectionsDb.splice(index, 1);

      return new HttpResponse(null, { status: 204 });
    },
  ),
];