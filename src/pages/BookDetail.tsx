import BookHero from "../features/Detail/BookHero";
import BookSummary from "../features/Detail/BookSummary";
import QuoteSec from "../features/Detail/QuoteSec";
import Aesthetic from "../features/Detail/Aesthetic";

export default function BookDetail() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <BookHero />

      <BookSummary />

      <QuoteSec />

      <Aesthetic />
    </main>
  );
}
