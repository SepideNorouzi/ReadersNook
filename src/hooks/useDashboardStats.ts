import { useMemo } from "react";
import { useBooks } from "./useBooks";
import { useCollections } from "./useCollections";


export function useDashboardStats() {

  const { data: books = [] } = useBooks();

  const {
    collections = [],
  } = useCollections();


  const stats = useMemo(() => {

    const quotes = books.reduce(
      (total, book) =>
        total + (book.quotes?.length ?? 0),
      0
    );


    return {

      totalBooks: books.length,

      streak: 0,

      quotes,

      collections: collections.length,

    };

  }, [books, collections]);


  return stats;
}