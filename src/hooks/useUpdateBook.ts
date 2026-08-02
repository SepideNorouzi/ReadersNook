import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBook } from "../services/books";
import type { Book } from "../types/book";

type UpdateBookInput = {
  id: string;
  changes: Partial<Book>;
};

export function useUpdateBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, changes }: UpdateBookInput) => updateBook(id, changes),

    onSuccess: (updatedBook) => {
      queryClient.setQueryData<Book[]>(["books"], (oldBooks = []) =>
        oldBooks.map((book) =>
          book.id === updatedBook.id ? updatedBook : book,
        ),
      );
    },
  });
}
