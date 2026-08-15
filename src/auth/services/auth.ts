import type {
  AuthUser,
  LoginCredentials,
  Profile,
  RegisterData,
  TokenResponse,
} from "../types/auth";

const API_URL = "http://localhost:8000/api";

export class AuthHttpError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "AuthHttpError";
    this.status = status;
  }
}

export function parseApiError(error: unknown, fallback: string): string {
  if (!error || typeof error !== "object") return fallback;

  const body = error as Record<string, unknown>;

  if (typeof body.detail === "string") return body.detail;
  if (Array.isArray(body.detail) && typeof body.detail[0] === "string") {
    return body.detail[0];
  }
  if (typeof body.message === "string") return body.message;

  const fieldMessages = Object.values(body).flatMap((value) => {
    if (typeof value === "string") return [value];
    if (Array.isArray(value) && typeof value[0] === "string") return [value[0]];
    return [];
  });

  return fieldMessages[0] ?? fallback;
}

async function throwApiError(
  response: Response,
  fallback: string,
): Promise<never> {
  const body = await response.json().catch(() => null);
  throw new AuthHttpError(parseApiError(body, fallback), response.status);
}

export function toProfile(user: AuthUser): Profile {
  return {
    id: user.username,
    name: `${user.first_name} ${user.last_name}`.trim(),
    username: user.username,
    avatarUrl: null,
  };
}

export async function login(
  credentials: LoginCredentials,
): Promise<TokenResponse> {
  const response = await fetch(`${API_URL}/auth/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    await throwApiError(response, "Invalid username or password.");
  }

  return response.json();
}

export async function register(data: RegisterData): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    await throwApiError(response, "Registration failed.");
  }

  return response.json();
}

export async function getMe(accessToken: string): Promise<AuthUser> {
  const response = await fetch(`${API_URL}/auth/me/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    await throwApiError(response, "Failed to fetch authenticated user.");
  }

  return response.json();
}

export async function refreshToken(refresh: string): Promise<TokenResponse> {
  const response = await fetch(`${API_URL}/auth/token/refresh/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh }),
  });

  if (!response.ok) {
    await throwApiError(response, "Refresh token expired.");
  }

  return response.json();
}
