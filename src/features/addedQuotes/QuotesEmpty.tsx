import { BookOpen } from "lucide-react";

import Card from "../../components/ui/Card";

export default function QuotesEmpty() {
  return (
    <Card
      className="
        relative overflow-hidden
        rounded-[22px]
        border border-[var(--brown-200)]
        bg-[var(--surface)]
        shadow-[0_8px_24px_rgba(72,45,30,0.06)]
      "
    >
      <div
        className="
          pointer-events-none
          absolute -right-10 -top-10
          h-36 w-36
          rounded-full
          bg-[var(--gold)]/10
          blur-3xl
        "
      />

      <div
        className="
          relative
          flex min-h-[22rem]
          flex-col items-center
          justify-center
          px-6 py-12
          text-center
        "
      >
        <div
          className="
            mb-5
            flex h-14 w-14
            items-center justify-center
            rounded-2xl
            border border-[var(--gold)]/20
            bg-gradient-to-br
            from-[var(--gold)]/12
            to-[var(--orange)]/8
            text-[var(--gold)]
            shadow-[0_8px_20px_rgba(191,151,70,0.10)]
          "
        >
          <BookOpen size={24} strokeWidth={1.6} />
        </div>

        <h2
          className="
            font-heading
            text-lg
            font-semibold
            text-[var(--text)]
          "
        >
          Your quote collection is waiting
        </h2>

        <p
          className="
            mt-2
            max-w-sm
            text-sm
            leading-6
            text-[var(--text-secondary)]
          "
        >
          Save the lines that make you stop, underline the page, or stare at the
          wall for five minutes.
        </p>
      </div>
    </Card>
  );
}
