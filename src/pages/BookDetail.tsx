import { Navigate, useParams } from "react-router";
import { useBook } from "../hooks/useBook";
import BookHero from "../features/Detail/BookHero";

export default function BookDetail() {
  const { id } = useParams();

  if (!id) return <Navigate to="/404" replace />;

  const { data: book, isLoading } = useBook(id);

  if (isLoading) return <p>Loading...</p>;
  if (!book) return <p>Book not found.</p>;

  return (
    <main className="min-h-screen bg-bg">
      <BookHero book={book} />
      {/* <BookSummary book={book} /> */}
      {/* <QuotesSection bookId={book.id} /> */}
      {/* <AestheticsGrid bookId={book.id} /> */}
    </main>
  );
}
