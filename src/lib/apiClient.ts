import { useAuthStore } from "../auth/store/authStore";
import { refreshToken as refreshTokenRequest } from "../auth/services/auth";
import { logoutSession } from "../auth/session";
import { getAuthTransportVersion } from "../auth/authTransport";

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

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

// Changes whenever the authenticated session is invalidated.
// This prevents an old refresh request from modifying a new session.
let authTransportVersion = 0;

export function invalidateAuthTransport() {
  authTransportVersion += 1;
  refreshInFlight = null;
}

/**
 * Single-flight refresh: no matter how many requests 401 at once, only
 * one POST to /auth/refresh/ ever goes out. Everyone else awaits the
 * same promise instead of racing it.
 */
async function getFreshAccessToken(): Promise<string> {
  if (refreshInFlight) {
    return refreshInFlight;
  }

  const versionAtStart = getAuthTransportVersion();

  refreshInFlight = (async () => {
    const refresh = useAuthStore.getState().refreshToken;

    if (!refresh) {
      throw new ApiError("No refresh token available.", 401);
    }

    const tokens = await refreshTokenRequest(refresh);

    // User changed sessions while refresh
    // was running.
    if (versionAtStart !== getAuthTransportVersion()) {
      throw new ApiError("Authentication session changed.", 401);
    }

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
  const requestVersion = authTransportVersion;

  const accessToken = useAuthStore.getState().accessToken;

  const res = await doFetch(path, options, accessToken);

  // Session changed while this request was running.
  if (requestVersion !== authTransportVersion) {
    throw new ApiError("Authentication session changed.", 401);
  }

  if (res.status === 401 && !_isRetry) {
    try {
      await getFreshAccessToken();
    } catch {
      await logoutSession();
      throw new ApiError("Session expired. Please log in again.", 401);
    }

    return apiFetch<T>(path, options, true);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);

    const detail =
      body && typeof body === "object" && "detail" in body
        ? String((body as { detail: unknown }).detail)
        : null;

    throw new ApiError(detail || `Request failed: ${res.status}`, res.status);
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}
