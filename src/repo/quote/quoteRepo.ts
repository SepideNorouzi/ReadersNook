import { useModeStore } from "../../store/modeStore";

import { demoQuoteRepo } from "./demoQuoteRepo";
import { adminQuoteRepo } from "./adminQuoteRepo";

export const quoteRepository = {
  useBookQuotes(bookId: string | undefined, enabled = true) {
    const mode = useModeStore((state) => state.mode);

    /*
     * Both repositories expose the same hook shape.
     * We call both because both branches are hooks and therefore
     * must be called consistently on every render.
     */
    const demo = demoQuoteRepo.useBookQuotes(bookId, enabled);

    const admin = adminQuoteRepo.useBookQuotes(bookId, enabled);

    return mode === "demo" ? demo : admin;
  },

  useCreateQuote() {
    const mode = useModeStore((state) => state.mode);

    const demo = demoQuoteRepo.useCreateQuote();
    const admin = adminQuoteRepo.useCreateQuote();

    return mode === "demo" ? demo : admin;
  },

  useUpdateQuote() {
    const mode = useModeStore((state) => state.mode);

    const demo = demoQuoteRepo.useUpdateQuote();
    const admin = adminQuoteRepo.useUpdateQuote();

    return mode === "demo" ? demo : admin;
  },

  useDeleteQuote() {
    const mode = useModeStore((state) => state.mode);

    const demo = demoQuoteRepo.useDeleteQuote();
    const admin = adminQuoteRepo.useDeleteQuote();

    return mode === "demo" ? demo : admin;
  },

  useAllQuotes() {
    const mode = useModeStore((state) => state.mode);

    const demo = demoQuoteRepo.useAllQuotes();
    const admin = adminQuoteRepo.useAllQuotes(mode === "admin");

    return mode === "demo" ? demo : admin;
  },
};
