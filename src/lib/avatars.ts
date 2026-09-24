export type AvatarOption = { id: string; src: string; name: string };

export const avatarOptions: AvatarOption[] = [
  { id: "dreamer", src: "/avatars/00.png", name: "The Dreamer" },
  { id: "curious-reader", src: "/avatars/01.png", name: "The Curious Reader" },
  { id: "adventurer", src: "/avatars/02.png", name: "The Adventurer" },
  { id: "scholar", src: "/avatars/03.png", name: "The Scholar" },
  { id: "storyteller", src: "/avatars/04.png", name: "The Storyteller" },
  { id: "bookworm", src: "/avatars/05.png", name: "The Bookworm" },
];

const byId = new Map(avatarOptions.map((a) => [a.id, a]));

// Unknown or empty id → null → the UI falls back to the UserRound icon.
export function resolveAvatarSrc(id?: string | null): string | null {
  return (id && byId.get(id)?.src) || null;
}
