// Raw shape returned by the backend's /auth/me/ endpoint.
export interface AuthUser {
  id: number; // backend primary key
  first_name: string;
  last_name: string;
  username: string;
  avatar: string | null; // avatar *id* (e.g. "dreamer"), not a URL. "" until chosen.
}

// Canonical, UI-facing user shape — everything in the app (components,
// hooks, both repos) should consume this and never the raw AuthUser.
export interface Profile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
}

// Derived from AuthUser so the contract has a single source of truth.
export type ProfilePatch = Partial<
  Pick<AuthUser, "first_name" | "last_name" | "username" | "avatar">
>;

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  password2: string;
}

export interface TokenResponse {
  access: string;
  // SimpleJWT omits this unless ROTATE_REFRESH_TOKENS is on.
  refresh?: string;
}
