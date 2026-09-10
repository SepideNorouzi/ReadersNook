export const queryKeys = {
  books: (username: string) => ["books", username] as const,

  book: (username: string, bookId: string) =>
    ["books", username, bookId] as const,

  collections: (username: string) => ["collections", username] as const,

  quotes: (username: string) => ["quotes", username] as const,

  currentReading: (username: string) => ["current-reading", username] as const,

  readingGoal: (username: string) => ["reading-goal", username] as const,

  stats: (username: string) => ["stats", username] as const,

  search: (query: string) => ["search", query] as const,
};
