import type {
  AuthUser,
  LoginCredentials,
  RegisterData,
  TokenResponse,
} from "../types/auth";

const API_URL = "http://localhost:8000/api";

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
    const error = await response.json().catch(() => null);

    throw new Error(
      error?.detail || error?.message || "Invalid username or password.",
    );
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
    const error = await response.json().catch(() => null);

    throw new Error(error?.detail || error?.message || "Registration failed.");
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
    throw new Error("Failed to fetch authenticated user.");
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
    throw new Error("Refresh token expired.");
  }

  return response.json();
}
