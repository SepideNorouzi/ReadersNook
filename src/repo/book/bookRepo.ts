import { useModeStore } from "../../store/modeStore";
import { demoBookRepo } from "./demoBookRepo";
import { adminBookRepo } from "./adminBookRepo";

export const BOOKS_KEY = ["books"] as const;

export const bookDetailKey = (id: string) => [...BOOKS_KEY, id] as const;

export const bookRepository = {
  useBooks() {
    const mode = useModeStore((s) => s.mode);
    const isAdmin = mode === "admin";

    const demoBooks = demoBookRepo.useBooks();
    const adminBooks = adminBookRepo.useBooks(isAdmin);

    return isAdmin ? adminBooks : demoBooks;
  },

  useBook(id: string | undefined) {
    const mode = useModeStore((s) => s.mode);
    const isAdmin = mode === "admin";

    const demoBook = demoBookRepo.useBook(id);
    const adminBook = adminBookRepo.useBook(id, isAdmin);

    return isAdmin ? adminBook : demoBook;
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
