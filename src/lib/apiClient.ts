import { useAuthStore } from "../auth/store/authStore";
import { refreshToken as refreshTokenRequest } from "../auth/services/auth";
import { logoutSession } from "../auth/session";
import {
  getAuthTransportVersion,
} from "../auth/authTransport";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

export class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
};

let refreshInFlight: {
  version: number;
  promise: Promise<string>;
} | null = null;

async function getFreshAccessToken(): Promise<string> {
  const currentVersion = getAuthTransportVersion();

  // Reuse only a refresh belonging to THIS auth session.
  if (
    refreshInFlight &&
    refreshInFlight.version === currentVersion
  ) {
    return refreshInFlight.promise;
  }

  const promise = (async () => {
    const refresh =
      useAuthStore.getState().refreshToken;

    if (!refresh) {
      throw new ApiError(
        "No refresh token available.",
        401,
      );
    }

    const tokens =
      await refreshTokenRequest(refresh);

    // Logout/login happened while refresh was running.
    if (
      currentVersion !==
      getAuthTransportVersion()
    ) {
      throw new ApiError(
        "Authentication session changed.",
        401,
      );
    }

    useAuthStore
      .getState()
      .setTokens(
        tokens.access,
        tokens.refresh,
      );

    return tokens.access;
  })();

  refreshInFlight = {
    version: currentVersion,
    promise,
  };

  try {
    return await promise;
  } finally {
    if (
      refreshInFlight?.promise === promise
    ) {
      refreshInFlight = null;
    }
  }
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
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...headers,
    },
    body:
      body !== undefined
        ? JSON.stringify(body)
        : undefined,
  });
}

export async function apiFetch<T>(
  path: string,
  options: RequestOptions = {},
  isRetry = false,
): Promise<T> {
  const requestVersion =
    getAuthTransportVersion();

  const accessToken =
    useAuthStore.getState().accessToken;

  const res = await doFetch(
    path,
    options,
    accessToken,
  );

  // The request started under a different session.
  if (
    requestVersion !==
    getAuthTransportVersion()
  ) {
    throw new ApiError(
      "Authentication session changed.",
      401,
    );
  }

  if (res.status === 401 && !isRetry) {
    try {
      await getFreshAccessToken();
    } catch {
      await logoutSession();

      throw new ApiError(
        "Session expired. Please log in again.",
        401,
      );
    }

    return apiFetch<T>(
      path,
      options,
      true,
    );
  }

  if (!res.ok) {
    const body = await res
      .json()
      .catch(() => null);

    const detail =
      body &&
      typeof body === "object" &&
      "detail" in body
        ? String(
            (
              body as {
                detail: unknown;
              }
            ).detail,
          )
        : null;

    throw new ApiError(
      detail ||
        `Request failed: ${res.status}`,
      res.status,
    );
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}