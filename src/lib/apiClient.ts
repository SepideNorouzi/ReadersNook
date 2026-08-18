import { useAuthStore } from "../auth/store/authStore";
import { refreshToken as refreshTokenRequest } from "../auth/services/auth"; // adjust path to your real services/auth.ts

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000/api";

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

let refreshInFlight: Promise<string> | null = null;

/**
 * Single-flight refresh: no matter how many requests 401 at once, only
 * one POST to /auth/refresh/ ever goes out. Everyone else awaits the
 * same promise instead of racing it.
 */
async function getFreshAccessToken(): Promise<string> {
  if (refreshInFlight) return refreshInFlight;

  refreshInFlight = (async () => {
    const refresh = useAuthStore.getState().refreshToken;
    if (!refresh) throw new ApiError("No refresh token available.", 401);

    // Raw call — NOT apiFetch. Going through apiFetch here would mean
    // a failed refresh triggers. another refresh attempt. Infinite loop.
    const tokens = await refreshTokenRequest(refresh);
    useAuthStore.getState().setTokens(tokens.access, tokens.refresh);
    return tokens.access;
  })().finally(() => {
    refreshInFlight = null;
  });

  return refreshInFlight;
}

async function doFetch(
  path: string,
  options: RequestOptions,
  token: string | null,
) {
  const { body, headers, ...rest } = options;
  return fetch(`${BASE_URL}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
  _isRetry = false,
): Promise<T> {
  const accessToken = useAuthStore.getState().accessToken;
  const res = await doFetch(path, options, accessToken);

  if (res.status === 401 && !_isRetry) {
    // _isRetry guards against looping forever if the refresh token
    // is ALSO dead — we only get one retry attempt per original call.
    try {
      await getFreshAccessToken();
    } catch {
      useAuthStore.getState().logout();
      throw new ApiError("Session expired. Please log in again.", 401);
    }
    return apiFetch<T>(path, options, true);
  }

  if (!res.ok) throw new ApiError(`Request failed: ${res.status}`, res.status);
  if (res.status === 204) return undefined as T;
  return res.json();
}
