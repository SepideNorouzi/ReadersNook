import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Bookmark, FolderPlus, MoreHorizontal, X } from "lucide-react";

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

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }
    setVisible(false);
  }, [open]);

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

      {open &&
        createPortal(
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
                absolute inset-x-0 top-0
                pt-[max(0.75rem,env(safe-area-inset-top))]
                rounded-b-3xl bg-[var(--surface)]
                px-5 pb-6
                shadow-[var(--shadow-lg)]
                transition-transform duration-200 ease-out
                ${visible ? "translate-y-0" : "-translate-y-full"}
              `}
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-serif text-lg text-brown-900">Options</h2>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)]"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <Row icon={Bookmark} label="Status">
                  <StatusBadge value={status} onChange={onStatusChange} />
                </Row>
                <Row icon={FolderPlus} label="Add to Collection">
                  <CollectionPicker book={book} />
                </Row>
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
}

function Row({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3">
      <span className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
        <Icon className="h-4 w-4 text-[var(--brown-400)]" />
        {label}
      </span>
      {children}
    </div>
  );
}