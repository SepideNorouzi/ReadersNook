import { Quote } from "lucide-react";

type Props = {
  count: number;
};

export default function QuotesHeader({ count }: Props) {
  return (
    <header className="mb-6 sm:mb-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span
              className="
                flex h-7 w-7 items-center justify-center
                rounded-lg
                bg-[var(--gold)]/12
                text-[var(--gold)]
              "
            >
              <Quote size={14} strokeWidth={1.8} />
            </span>

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.14em]
                text-[var(--brown-600)]
              "
            >
              Your collection
            </span>
          </div>

          <h1
            className="
              font-heading
              text-2xl
              font-semibold
              text-[var(--text)]
              sm:text-3xl
            "
          >
            Favorite quotes
          </h1>
        </div>

        <span
          className="
            shrink-0
            rounded-full
            border border-[var(--brown-200)]
            bg-[var(--surface)]
            px-2.5 py-1
            text-[10px]
            font-semibold
            text-[var(--text-muted)]
            shadow-[0_4px_12px_rgba(72,45,30,0.05)]
            sm:px-3 sm:py-1.5
            sm:text-xs
          "
        >
          {count} {count === 1 ? "quote" : "quotes"}
        </span>
      </div>
    </header>
  );
}