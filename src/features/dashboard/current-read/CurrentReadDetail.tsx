interface CurrentReadingDetailsProps {
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
}

export default function CurrentReadDetails({
  title,
  author,
  currentPage,
  totalPages,
}: CurrentReadingDetailsProps) {
  return (
    <div className="space-y-2 text-sm">
      <p>
        <span className="font-semibold">Title:</span> {title}
      </p>

      <p>
        <span className="font-semibold">Author:</span> {author}
      </p>

      <p>
        <span className="font-semibold">Pages:</span> {currentPage} /
        {totalPages}
      </p>
    </div>
  );
}
