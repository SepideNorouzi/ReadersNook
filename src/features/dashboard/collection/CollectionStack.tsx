import type { CSSProperties } from "react";
import type { Book } from "../../../types/book";

export interface CollectionStackProps {
  books: Book[];
  maxVisible?: number;
  onClick?: () => void;
}

type StackLayerStyle = CSSProperties & Record<`--${string}`, string>;

export default function CollectionStack({
  books,
  maxVisible = 3,
  onClick,
}: CollectionStackProps) {
  const visibleBooks = books.slice(0, maxVisible);
  const stack = [...visibleBooks].reverse();

  if (stack.length === 0) {
    return <div className="h-24 w-16 rounded-lg bg-[var(--stone-100)]" />;
  }

  return (
    <div onClick={onClick} className="group relative h-24 w-16 shrink-0">
      {stack.map((book, i) => {
        const depth = stack.length - 1 - i;
        const isFront = depth === 0;

        const restX = depth * 5;
        const restY = depth * -3;
        const restR = depth * 4;

        // Slightly more separated on hover
        const hoverX = depth * 9;
        const hoverY = depth * -5;
        const hoverR = depth * 7;

        const shadow =
          depth === 0
            ? "0 6px 14px rgba(35,23,17,.18)"
            : `0 ${3 + depth}px ${8 + depth * 3}px rgba(35,23,17,.12)`;

        const style: StackLayerStyle = {
          "--tx": `${restX}px`,
          "--ty": `${restY}px`,
          "--tr": `${restR}deg`,

          "--hover-tx": `${hoverX}px`,
          "--hover-ty": `${hoverY}px`,
          "--hover-tr": `${hoverR}deg`,

          "--shadow": shadow,
          "--z": String(i),

          filter: isFront ? "none" : "brightness(.95)",
        };

        return (
          <img
            key={book.id}
            src={book.coverUrl}
            alt={book.title}
            style={style}
            className={`
              absolute inset-0
              h-full w-full
              rounded-md
              object-cover
              [z-index:var(--z)]
              [box-shadow:var(--shadow)]

              transition-all
              duration-300
              ease-out

              ${
                isFront
                  ? `
              hover:z-50
              hover:scale-[1.03]
              `
                  : `
              group-has-[img:hover]:[transform:translate(var(--hover-tx),var(--hover-ty))_rotate(var(--hover-tr))]
              `
              }

              ${
                isFront
                  ? "[transform:translate(var(--tx),var(--ty))_rotate(var(--tr))]"
                  : "[transform:translate(var(--tx),var(--ty))_rotate(var(--tr))]"
              }
            `}
          />
        );
      })}
    </div>
  );
}
