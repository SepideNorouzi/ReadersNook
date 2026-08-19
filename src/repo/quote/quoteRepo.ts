import { useModeStore } from "../../store/modeStore";

import { demoQuoteRepo } from "./demoQuoteRepo";
import { adminQuoteRepo } from "./adminQuoteRepo";

export const quoteRepository = {
  useCreateQuote() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoQuoteRepo.useCreateQuote();
    const adminMutation = adminQuoteRepo.useCreateQuote();

    return mode === "demo" ? demoMutation : adminMutation;
  },

  useUpdateQuote() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoQuoteRepo.useUpdateQuote();
    const adminMutation = adminQuoteRepo.useUpdateQuote();

    return mode === "demo" ? demoMutation : adminMutation;
  },

  useDeleteQuote() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoQuoteRepo.useDeleteQuote();
    const adminMutation = adminQuoteRepo.useDeleteQuote();

    return mode === "demo" ? demoMutation : adminMutation;
  },
};
