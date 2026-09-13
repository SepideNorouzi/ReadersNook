import type { InputHTMLAttributes, ReactNode } from "react";

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  icon?: ReactNode;
  error?: string;
};

export default function FormField({
  label,
  icon,
  error,
  id,
  className = "",
  ...props
}: FormFieldProps) {
  const generatedId = id ?? label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div>
      <label
        htmlFor={generatedId}
        className="
          mb-2 block
          text-xs font-semibold
          tracking-wide
          text-[var(--text)]
        "
      >
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div
            className="
              pointer-events-none
              absolute left-4 top-1/2
              -translate-y-1/2
              text-[var(--text-muted)]
            "
          >
            {icon}
          </div>
        )}

        <input
          id={generatedId}
          aria-invalid={!!error}
          {...props}
          className={`
            h-12 w-full
            rounded-xl
            border border-[var(--border)]
            bg-[var(--stone-100)]
            px-4
            text-sm
            text-[var(--text)]
            placeholder:text-[var(--text-muted)]
            outline-none
            transition-all duration-200
            hover:border-[var(--brown-300)]
            focus:border-[var(--gold)]
            focus:bg-[var(--surface)]
            focus:ring-4
            focus:ring-[var(--gold)]/10
            ${icon ? "pl-11" : ""}
            ${className}
          `}
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
