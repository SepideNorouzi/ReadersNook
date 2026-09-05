import { Navigate, useNavigate, useParams } from "react-router";

import { BookOpen, ChevronLeft } from "lucide-react";

import { useBook } from "../hooks/useBook";

import BookHero from "../features/Detail/hero/BookHero";
import DetailContent from "../features/Detail/DetailContent";
import Loading from "../shared/Loading";

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: book, isLoading } = useBook(id);

  if (!id) return <Navigate to="/404" replace />;

  if (isLoading) return <Loading />;

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
      <button
        onClick={() => navigate("/dashboard")}
        aria-label="Go to Dashboard"
        className="
        hidden
    absolute
    top-10
    right-10
    z-[100]

    group

    lg:flex
    h-11
              w-11
              shrink-0
              items-center
              justify-center
              rounded-2xl

    bg-gradient-to-br
              from-[var(--sidebar-accent-start)]
              to-[var(--sidebar-accent-end)]

    text-white

    shadow-[0_12px_30px_rgba(54,35,27,.28),inset_0_1px_1px_rgba(255,255,255,.18)]

    transition-all
    duration-300

    hover:-translate-y-1
    hover:scale-105
    hover:shadow-[0_18px_42px_rgba(54,35,27,.35)]

    active:scale-95
  "
      >
        <div
          className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-2xl

              bg-gradient-to-br
              from-[var(--sidebar-accent-start)]
              to-[var(--sidebar-accent-end)]

              text-white

              shadow-[0_12px_30px_rgba(54,35,27,.28),inset_0_1px_1px_rgba(255,255,255,.18)]

              transition-all
              duration-200
              ease-out

              hover:-translate-y-0.5

              hover:shadow-[0_14px_34px_rgba(54,35,27,.34),inset_0_1px_1px_rgba(255,255,255,.2)]

              active:translate-y-0
              active:scale-95
            "
        >
          <BookOpen size={20} />
        </div>
      </button>

      <BookHero book={book} />

      <DetailContent book={book} />
    </main>
  );
}
