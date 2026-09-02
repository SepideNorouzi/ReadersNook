import type { Book } from "../../../types/book";
interface Props {
  book: Book;
}
export default function CurrentReadProgress({ book }: Props) {
  const percentage = Math.round((book.currentPage / book.totalPages) * 100);
  return (
    <div className="space-y-2.5">
      {" "}
      <div className="flex items-center justify-between">
        {" "}
        <span className=" text-[10px] uppercase tracking-[0.18em] text-[var(--brown-300)] ">
          {" "}
          Progress{" "}
        </span>{" "}
        <span className=" text-[11px] font-semibold text-[var(--gold-light)] ">
          {" "}
          {percentage}%{" "}
        </span>{" "}
      </div>{" "}
      <div className=" h-2.5 w-full overflow-hidden rounded-full bg-[var(--brown-900)]/45 shadow-[inset_0_1px_3px_rgba(35,23,17,0.28)] ">
        {" "}
        <div
          className=" h-full rounded-full bg-gradient-to-r from-[var(--gold)] to-[var(--orange)] shadow-[0_0_8px_rgba(207,162,71,0.35),0_0_18px_rgba(185,109,69,0.16)] transition-all duration-500 ease-out "
          style={{ width: `${percentage}%` }}
        />{" "}
      </div>{" "}
    </div>
  );
}
