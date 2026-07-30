// src/data/collection.ts
import type { Collection } from "../types/collection";

export const collections: Collection[] = [
  {
    id: "c1",
    name: "Cozy Fantasy",
    description: "Comfort reads for rainy days",
    bookIds: ["1", "4"], // Piranesi, The Hobbit
  },
  {
    id: "c2",
    name: "Book Club Picks",
    bookIds: ["3", "6", "7"],
  },
  {
    id: "c3",
    name: "Book Club Picks",
    bookIds: ["11", "10", "9"],
  },
];
