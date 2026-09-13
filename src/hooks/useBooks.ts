import { useState } from "react";
import { bookRepository } from "../repo/book/bookRepo";
import { isBookInLibrary } from "../repo/book/isBookInLibrary";
import { bookFromSearchResult } from "../services/bookFromSearch";
import type { BookSearchResult } from "../types/searchResults";
import { useModeStore } from "../store/modeStore";

export function useBooks() {
  return bookRepository.useBooks();
}

export function useCreateBook() {
  return bookRepository.useCreateBook();
}

export function useUpdateBook() {
  return bookRepository.useUpdateBook();
}

export function useDeleteBook() {
  return bookRepository.useDeleteBook();
}

export function useIsBookSaved(
  sourceId: string | undefined,
  identity?: { title: string; author: string },
) {
  const { data: books } = useBooks();
  return isBookInLibrary(books, sourceId, identity);
}

// add book to library hooks :
export function useAddToLibrary(result: BookSearchResult) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [justAdded, setJustAdded] = useState(false);

  const mode = useModeStore((state) => state.mode);
  const { mutateAsync: addBook, isPending } = useCreateBook();
  const savedLocally = useIsBookSaved(result.externalId, {
    title: result.title,
    author: result.author,
  });

  // Demo membership lives in the Zustand store. The search API's
  // `inLibrary` flag is the backend user's library and must not
  // disable Add while browsing in demo (including leftover admin tokens).
  const alreadySaved =
    justAdded || savedLocally || (mode === "admin" && result.inLibrary);

  const handleAdd = async () => {
    if (alreadySaved || isPending) return;
    setErrorMessage(null);
    try {
      await addBook(bookFromSearchResult(result));
      setJustAdded(true);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Couldn't add this book. Please try again.",
      );
    }
  };

  return { alreadySaved, isPending, errorMessage, handleAdd };
}
