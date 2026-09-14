import { Navigate, useLocation, useNavigate, useParams } from "react-router";

import { BookOpen, ChevronLeft } from "lucide-react";

import { useBook } from "../hooks/useBook";
import { bookFromSearchResult } from "../services/bookFromSearch";

import type { Book } from "../types/book";
import type { BookSearchResult } from "../types/searchResults";

import BookHero from "../features/Detail/hero/BookHero";
import DetailContent from "../features/Detail/DetailContent";
import Loading from "../shared/Loading";

type BookDetailLocationState = {
  searchResult?: BookSearchResult;
};

export default function BookDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: book, isLoading } = useBook(id);

  const state = location.state as BookDetailLocationState | null;
  const searchResult = state?.searchResult;

  if (!id) {
    return <Navigate to="/404" replace />;
  }

  if (isLoading) {
    return <Loading />;
  }

  /*
   * when the user arrives here directly from search, the book may
   * not exist in their library yet. In that case the search result
   * already contains enough information to render a detail preview.
   */
  let detailBook: Book | null = book ?? null;

  if (!detailBook && searchResult) {
    const preview = bookFromSearchResult(searchResult);

    detailBook = {
      ...preview,

      /*
       * This is only a temporary UI identity for the unsaved preview.
       * It is NOT a library-entry id and must not be used for mutations.
       */
      id,

      addedAt: undefined,
    };
  }

  if (!detailBook) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg">
        {" "}
        <p className="text-[var(--text-muted)]">Book not found.</p>{" "}
      </main>
    );
  }

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
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="
        hidden
fixed
top-6
z-[100]
lg:flex
h-10
w-10
items-center
justify-center
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
lg:left-95
"
      >
        {" "}
        <ChevronLeft className="h-5 w-5 text-stone-600" />{" "}
      </button>

      {/* Dashboard Button */}
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        aria-label="Go to Dashboard"
        className="
      absolute
      right-10
      top-10
      z-[100]
      hidden
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
      lg:flex
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

      <BookHero book={detailBook} />

      <DetailContent
        book={detailBook}
        searchResult={book ? undefined : searchResult}
      />
    </main>
  );
}
