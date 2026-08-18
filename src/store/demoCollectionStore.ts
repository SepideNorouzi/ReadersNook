import { create } from "zustand";
import { collections as mockCollections } from "../data/collection";
import type { Collection } from "../types/collection";

interface CollectionStore {
  collections: Collection[];

  setCollections: (collections: Collection[]) => void;
  addCollection: (collection: Collection) => void;
  updateCollection: (id: string, changes: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  resetCollections: () => void;
}

export const useCollectionStore = create<CollectionStore>((set) => ({
  collections: structuredClone(mockCollections),

  setCollections: (collections) => set({ collections }),

  addCollection: (collection) =>
    set((state) => ({
      collections: [...state.collections, collection],
    })),

  updateCollection: (id, changes) =>
    set((state) => ({
      collections: state.collections.map((collection) =>
        collection.id === id ? { ...collection, ...changes } : collection,
      ),
    })),

  deleteCollection: (id) =>
    set((state) => ({
      collections: state.collections.filter(
        (collection) => collection.id !== id,
      ),
    })),

  resetCollections: () =>
    set({
      collections: structuredClone(mockCollections),
    }),
}));
