import { beforeEach, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import type { ReactNode } from "react";

import { server } from "../data/server";
import { useSearchBooks } from "./useSearchBooks";
import { useBookStore } from "../store/demoBookStore";
import { useModeStore } from "../store/modeStore";

const API = "http://localhost:8000";

function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

beforeEach(() => {
  useModeStore.getState().setMode("demo");
  useBookStore.getState().setBooks([]);

  server.use(
    http.get(`${API}/search/books/`, () =>
      HttpResponse.json({
        query: "piranesi",
        page: 1,
        per_page: 20,
        results: [
          {
            external_id: "hardcover:123",
            title: "Piranesi",
            author: "Susanna Clarke",
            summary: "A man lives in a house of infinite rooms.",
            cover_url: "",
            total_pages: 245,
            in_library: true,
          },
        ],
      }),
    ),
  );
});

it("overlays demo library membership onto search hits so API in_library is ignored", async () => {
  const { result } = renderHook(() => useSearchBooks("piranesi"), { wrapper });

  await waitFor(() => {
    expect(result.current.data?.[0]?.inLibrary).toBe(false);
  });

  useBookStore.getState().addBook({
    id: "local-1",
    title: "Piranesi",
    author: "Susanna Clarke",
    summary: "",
    coverUrl: "",
    currentPage: 0,
    totalPages: 245,
    status: "tbr",
    rating: 0,
    quotes: [],
    aestheticImages: [],
    sourceId: "hardcover:123",
  });

  await waitFor(() => {
    expect(result.current.data?.[0]?.inLibrary).toBe(true);
  });
});
