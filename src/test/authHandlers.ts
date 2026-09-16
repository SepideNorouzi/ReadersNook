import { http, HttpResponse } from "msw";

import type { AuthUser } from "../auth/types/auth";

import { mockAuthUser } from "./fixtures";

export const AUTH_API = "http://localhost:8000";

export type AuthApiState = {
  user: AuthUser;
  access: string;
  refresh: string;
  credentials: { username: string; password: string };
};

export function createAuthApiState(): AuthApiState {
  return {
    user: mockAuthUser(),
    access: "access-token",
    refresh: "refresh-token",
    credentials: { username: "sepide", password: "password123" },
  };
}

export function authHandlers(state: AuthApiState) {
  return [
    http.post(`${AUTH_API}/auth/token/`, async ({ request }) => {
      const body = (await request.json()) as {
        username: string;
        password: string;
      };

      if (
        body.username === state.credentials.username &&
        body.password === state.credentials.password
      ) {
        return HttpResponse.json({
          access: state.access,
          refresh: state.refresh,
        });
      }

      return HttpResponse.json(
        { detail: "Invalid username or password." },
        { status: 401 },
      );
    }),

    http.post(`${AUTH_API}/auth/register/`, async ({ request }) => {
      const body = (await request.json()) as {
        first_name: string;
        last_name: string;
        username: string;
        password: string;
        password2: string;
      };

      if (body.username === "taken") {
        return HttpResponse.json(
          { username: ["A user with that username already exists."] },
          { status: 400 },
        );
      }

      state.user = {
        first_name: body.first_name,
        last_name: body.last_name,
        username: body.username,
        avatar: null,
      };

      return HttpResponse.json(state.user, { status: 201 });
    }),

    http.get(`${AUTH_API}/auth/me/`, ({ request }) => {
      const header = request.headers.get("Authorization");

      if (header !== `Bearer ${state.access}`) {
        return HttpResponse.json(
          { detail: "Token is invalid or expired" },
          { status: 401 },
        );
      }

      return HttpResponse.json(state.user);
    }),

    http.patch(`${AUTH_API}/auth/me/`, async ({ request }) => {
      const header = request.headers.get("Authorization");

      if (header !== `Bearer ${state.access}`) {
        return HttpResponse.json(
          { detail: "Token is invalid or expired" },
          { status: 401 },
        );
      }

      const body = (await request.json()) as Partial<{
        avatar: string | null;
        first_name: string;
        last_name: string;
      }>;

      if (body.avatar !== undefined) {
        state.user.avatar = body.avatar;
      }

      if (body.first_name !== undefined) {
        state.user.first_name = body.first_name;
      }

      if (body.last_name !== undefined) {
        state.user.last_name = body.last_name;
      }

      return HttpResponse.json(state.user);
    }),

    http.post(`${AUTH_API}/auth/token/refresh/`, async ({ request }) => {
      const body = (await request.json()) as { refresh: string };

      if (body.refresh !== state.refresh) {
        return HttpResponse.json(
          { detail: "Token is invalid or expired" },
          { status: 401 },
        );
      }

      state.access = "new-access-token";
      state.refresh = "new-refresh-token";

      return HttpResponse.json({
        access: state.access,
        refresh: state.refresh,
      });
    }),
  ];
}
