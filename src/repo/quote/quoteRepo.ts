import { useModeStore } from "../../store/modeStore";

import { demoQuoteRepo } from "./demoQuoteRepo";
import { adminQuoteRepo } from "./adminQuoteRepo";

export const quoteRepository = {
  useCreateQuote() {
    const mode = useModeStore((s) => s.mode);

    const demo = demoQuoteRepo.useCreateQuote();
    const admin = adminQuoteRepo.useCreateQuote();

    return mode === "demo" ? demo : admin;
  },

  useUpdateQuote() {
    const mode = useModeStore((s) => s.mode);

    const demo = demoQuoteRepo.useUpdateQuote();
    const admin = adminQuoteRepo.useUpdateQuote();

    return mode === "demo" ? demo : admin;
  },

  useDeleteQuote() {
    const mode = useModeStore((s) => s.mode);

    const demo = demoQuoteRepo.useDeleteQuote();
    const admin = adminQuoteRepo.useDeleteQuote();

    return mode === "demo" ? demo : admin;
  },
};
