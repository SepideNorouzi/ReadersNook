import type { Book } from "../../../types/book";

interface Props {
  book: Book;
}

export default function CurrentReadDetails({ book }: Props) {
  return (
    <div className="space-y-1">
      <h4 className="line-clamp-1 text-base font-semibold text-[#2C1810] lg:text-lg">
        {book.title}
      </h4>

      <p className="text-sm text-[#8B7355]">
        {book.author}
      </p>

      <div className="flex items-center justify-between pt-2 text-xs text-[#8B7355]">
        <span>
          {book.currentPage} / {book.totalPages} pages
        </span>

        <span>
          {book.totalPages - book.currentPage} left
        </span>
      </div>
    </div>
  );
}