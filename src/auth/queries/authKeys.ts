export const authKeys = {
  all: ["auth"] as const,
  me: (mode: "demo" | "admin") => [...authKeys.all, "me", mode] as const,
};
