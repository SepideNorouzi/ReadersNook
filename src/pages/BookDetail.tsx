import { Navigate, useNavigate, useParams } from "react-router";

import { ChevronLeft } from "lucide-react";

import { useBook } from "../hooks/useBook";

import BookHero from "../features/Detail/hero/BookHero";
import DetailContent from "../features/Detail/DetailContent";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return <Navigate to="/404" replace />;

  const { data: book, isLoading } = useBook(id);

  if (isLoading) return <p>Loading...</p>;

  if (!book) return <p>Book not found.</p>;

  return (
    <main
      className="
      relative

      min-h-screen

      bg-bg

      lg:grid
      lg:grid-cols-[340px_minmax(0,1fr)]
      "
    >
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="
        fixed
        top-6
        left-80
        lg:left-95
        z-[100]
        flex
        items-center
        justify-center
        h-10
        w-10
        rounded-full
        border
        border-white/40
        bg-[var(--stone-200)]
        backdrop-blur-xl
        shadow-lg
        transition-all
        duration-300
        hover:scale-105
        hover:bg-white
        "
      >
        <ChevronLeft className="h-5 w-5 text-stone-600" />
      </button>

      <BookHero book={book} />

      <DetailContent book={book} />
    </main>
  );
}
