import { useEffect, useRef, useState } from "react";
import { MoreHorizontal, X } from "lucide-react";

import type { Book, BookStatus } from "../../../types/book";
import CollectionPicker from "../collection/CollectionPicker";
import StatusBadge from "./StatusBadge";

interface Props {
  book: Book;
  status: BookStatus;
  onStatusChange: (status: BookStatus) => void;
}

export default function HeroActionsMenu({ book, status, onStatusChange }: Props) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Mount on open, THEN flip the transition class a frame later.
  // If you toggle the class in the same tick as mounting, the browser
  // paints the "settled" state immediately and there's nothing to
  // transition from — you'd get an instant snap instead of a slide.
  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [open]);

  // Lock the page behind the sheet — otherwise the hero (h-screen on
  // lg, but still tall on mobile) scrolls underneath it.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function close() {
    setVisible(false);
    // Unmount only after the exit transition has had time to play —
    // the mirror image of the open effect above.
    setTimeout(() => {
      setOpen(false);
      triggerRef.current?.focus();
    }, 200);
  }

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setOpen(true)}
        aria-label="More options"
        aria-haspopup="dialog"
        aria-expanded={open}
        className="
          inline-flex h-9 w-9 items-center justify-center
          rounded-full border border-[#E7DED5] bg-[#FBF8F4]
          shadow-sm transition-colors hover:bg-white
        "
      >
        <MoreHorizontal className="h-4 w-4 text-stone-600" />
      </button>

      {open && (
        <div className="fixed inset-0 z-[200]" role="dialog" aria-modal="true">
          <div
            onClick={close}
            className={`
              absolute inset-0 bg-black/40 backdrop-blur-sm
              transition-opacity duration-200
              ${visible ? "opacity-100" : "opacity-0"}
            `}
          />

          <div
            className={`
              absolute inset-x-0 bottom-0
              rounded-t-3xl bg-white
              px-5 pb-8 pt-3
              shadow-[0_-20px_50px_rgba(35,23,17,0.25)]
              transition-transform duration-200 ease-out
              ${visible ? "translate-y-0" : "translate-y-full"}
            `}
          >
            <div className="mx-auto mb-4 h-1.5 w-10 rounded-full bg-stone-200" />

            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-lg text-brown-900">Options</h2>
              <button
                onClick={close}
                aria-label="Close"
                className="flex h-8 w-8 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <Row label="Status">
                <StatusBadge value={status} onChange={onStatusChange} />
              </Row>
              <Row label="Add to Collection">
                <CollectionPicker book={book} />
              </Row>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-stone-200 bg-stone-50/60 px-4 py-3">
      <span className="text-sm font-medium text-stone-700">{label}</span>
      {children}
    </div>
  );
}