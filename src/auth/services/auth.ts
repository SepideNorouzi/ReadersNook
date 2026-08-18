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

function firstMessage(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value;
  if (Array.isArray(value)) return firstMessage(value[0]);
  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;
    return firstMessage(record.string ?? record.msg ?? record.message ?? record.detail);
  }
  return null;
}

export function parseApiError(error: unknown, fallback: string): string {
  if (!error || typeof error !== "object") return fallback;

  const body = error as Record<string, unknown>;

  const fromDetail = firstMessage(body.detail);
  if (fromDetail) return fromDetail;

  const fromMessage = firstMessage(body.message);
  if (fromMessage) return fromMessage;

  for (const [key, value] of Object.entries(body)) {
    if (key === "code") continue;
    const message = firstMessage(value);
    if (message) return message;
  }

  return fallback;
}

async function throwApiError(
  response: Response,
  fallback: string,
): Promise<never> {
  const body = await response.json().catch(() => null);
  throw new AuthHttpError(parseApiError(body, fallback), response.status);
}

export function toProfile(user: AuthUser): Profile {
  const name = `${user.first_name} ${user.last_name}`.trim();

  return {
    id: user.username,
    name: name || user.username,
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
