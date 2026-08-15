// Raw shape returned by the backend's /auth/me/ endpoint.
export interface AuthUser {
  first_name: string;
  last_name: string;
  username: string;
}

// Canonical, UI-facing user shape — everything in the app (components,
// hooks, both repos) should consume this and never the raw AuthUser.
export interface Profile {
  id: string;
  name: string;
  username: string;
  avatarUrl: string | null;
}

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
