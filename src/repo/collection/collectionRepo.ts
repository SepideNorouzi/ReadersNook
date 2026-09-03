import { useModeStore } from "../../store/modeStore";

import { demoCollectionRepo } from "./demoCollectionRepo";
import { adminCollectionRepo } from "./adminCollectionRepo";

export const collectionRepository = {
  useCollections() {
    const mode = useModeStore((state) => state.mode);
    const isAdmin = mode === "admin";

    const demoCollections = demoCollectionRepo.useCollections();

    const adminCollections = adminCollectionRepo.useCollections(isAdmin);

    return isAdmin ? adminCollections : demoCollections;
  },

  useCreateCollection() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoCollectionRepo.useCreateCollection();

    const adminMutation = adminCollectionRepo.useCreateCollection();

    return mode === "demo" ? demoMutation : adminMutation;
  },

  useAddBookToCollection() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoCollectionRepo.useAddBookToCollection();

    const adminMutation = adminCollectionRepo.useAddBookToCollection();

    return mode === "demo" ? demoMutation : adminMutation;
  },

  useRemoveBookFromCollection() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoCollectionRepo.useRemoveBookFromCollection();

    const adminMutation = adminCollectionRepo.useRemoveBookFromCollection();

    return mode === "demo" ? demoMutation : adminMutation;
  },

  useRenameCollection() {
    const mode = useModeStore((state) => state.mode);

    const demoMutation = demoCollectionRepo.useRenameCollection();

    const adminMutation = adminCollectionRepo.useRenameCollection();

    return mode === "demo" ? demoMutation : adminMutation;
  },
};
