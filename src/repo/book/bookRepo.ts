import { useModeStore } from "../../store/modeStore";
import { demoBookRepo } from "./demoBookRepo";
import { adminBookRepo } from "./adminBookRepo";

export const bookRepository = {
  useBooks() {
    const mode = useModeStore((s) => s.mode);
    const isAdmin = mode === "admin";

    // Both hooks are ALWAYS called, every render, regardless of mode.
    // This isn't optional — React's rules of hooks require the same
    // hooks to run in the same order on every render. Only the return
    // value below is conditional, never the hook calls themselves.
    const demoBooks = demoBookRepo.useBooks();
    const adminBooks = adminBookRepo.useBooks(isAdmin);

    return isAdmin ? adminBooks : demoBooks;
  },

  useCreateBook() {
    const mode = useModeStore((s) => s.mode);
    const demoMutation = demoBookRepo.useCreateBook();
    const adminMutation = adminBookRepo.useCreateBook();
    return mode === "demo" ? demoMutation : adminMutation;
  },

  useUpdateBook() {
    const mode = useModeStore((s) => s.mode);
    const demoMutation = demoBookRepo.useUpdateBook();
    const adminMutation = adminBookRepo.useUpdateBook();
    return mode === "demo" ? demoMutation : adminMutation;
  },

  useDeleteBook() {
    const mode = useModeStore((s) => s.mode);
    const demoMutation = demoBookRepo.useDeleteBook();
    const adminMutation = adminBookRepo.useDeleteBook();
    return mode === "demo" ? demoMutation : adminMutation;
  },
};
