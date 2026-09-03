export const authKeys = {
  all: ["auth"] as const,

  me: (mode: "demo" | "admin", username?: string) =>
    username
      ? ([...authKeys.all, "me", mode, username] as const)
      : ([...authKeys.all, "me", mode] as const),
};
