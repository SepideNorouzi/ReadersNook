import { create } from "zustand";
import { books as mockBooks } from "../data/book";
import type { Book } from "../types/book";

interface BookStore {
  books: Book[];
  setBooks: (books: Book[]) => void;
  addBook: (book: Book) => void;
  updateBook: (id: string, changes: Partial<Book>) => void;
  deleteBook: (id: string) => void;
  resetBooks: () => void;
}

// structuredClone matters here: without it, every "demo" user would be
// reading and mutating the SAME array object your search/service layer
// also imports from `data/book.ts`. Cloning breaks that shared reference
// so resetting demo state can never corrupt your actual mock data.
export const useBookStore = create<BookStore>((set) => ({
  books: structuredClone(mockBooks),

  setBooks: (books) => set({ books }),

  addBook: (book) =>
    set((state) => ({
      books: [...state.books, book],
    })),

  updateBook: (id, changes) =>
    set((state) => ({
      books: state.books.map((book) =>
        book.id === id ? { ...book, ...changes } : book,
      ),
    })),

  deleteBook: (id) =>
    set((state) => ({
      books: state.books.filter((book) => book.id !== id),
    })),

  resetBooks: () =>
    set({
      books: structuredClone(mockBooks),
    }),
}));
