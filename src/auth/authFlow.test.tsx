import { beforeEach, describe, expect, it } from "vitest";
import { render, renderHook, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import type { ReactNode } from "react";

import { server } from "../data/server";
import { queryClient } from "../lib/queryClient";
import { authHandlers, createAuthApiState } from "../test/authHandlers";
import { useModeStore } from "../store/modeStore";
import { useDemoProfileStore } from "./store/demoProfileStore";
import { useAuthStore } from "./store/authStore";
import {
  AuthHttpError,
  getMe,
  login,
  parseApiError,
  refreshToken,
  register,
} from "./services/auth";
import { logoutSession } from "./session";
import { loginSchema, signupSchema } from "./schemas/authSchema";
import { authKeys } from "./queries/authKeys";
import { useAuth } from "./hooks/useAuth";
import ProtectedRoutes from "./components/ProtectedRoutes";
import RedirectIfAuthenticated from "./components/RedirectAuthenticated";
import AuthPage from "../pages/Auth";
import SettingsActions from "../features/settings/SettingsActions";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function resetClientState() {
  localStorage.clear();
  useAuthStore.getState().logout();
  useAuthStore.setState({
    accessToken: null,
    refreshToken: null,
    username: null,
    isAuthenticated: false,
    hydrated: true,
  });
  useModeStore.getState().setMode("demo");
  useDemoProfileStore.getState().resetProfile();
  queryClient.clear();
}

let authState = createAuthApiState();

beforeEach(() => {
  resetClientState();
  authState = createAuthApiState();
  server.use(...authHandlers(authState));
});

describe("auth schemas", () => {
  it("rejects an empty login form", () => {
    const result = loginSchema.safeParse({ username: "", password: "" });

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.issues.map((issue) => issue.message)).toEqual(
      expect.arrayContaining([
        "Username is required.",
        "Password is required.",
      ]),
    );
  });

  it("accepts a filled login form", () => {
    const result = loginSchema.safeParse({
      username: "sepide",
      password: "secret",
    });

    expect(result.success).toBe(true);
  });

  it("requires matching passwords on signup", () => {
    const result = signupSchema.safeParse({
      first_name: "Sepide",
      last_name: "Norouzi",
      username: "sepide",
      password: "password123",
      password2: "password124",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.issues[0]?.message).toBe("Passwords do not match.");
    expect(result.error.issues[0]?.path).toEqual(["password2"]);
  });

  it("rejects a username that is too short", () => {
    const result = signupSchema.safeParse({
      first_name: "Sepide",
      last_name: "Norouzi",
      username: "ab",
      password: "password123",
      password2: "password123",
    });

    expect(result.success).toBe(false);
    if (result.success) return;

    expect(result.error.issues[0]?.message).toBe(
      "Username must be at least 3 characters.",
    );
  });
});

describe("auth API services", () => {
  it("logs in and returns tokens", async () => {
    const tokens = await login({
      username: "sepide",
      password: "password123",
    });

    expect(tokens).toEqual({
      access: "access-token",
      refresh: "refresh-token",
    });
  });

  it("throws AuthHttpError on invalid credentials", async () => {
    await expect(
      login({ username: "sepide", password: "wrong" }),
    ).rejects.toMatchObject({
      name: "AuthHttpError",
      status: 401,
      message: "Invalid username or password.",
    });
  });

  it("registers a new user", async () => {
    const user = await register({
      first_name: "Ada",
      last_name: "Lovelace",
      username: "ada",
      password: "password123",
      password2: "password123",
    });

    expect(user).toEqual({
      first_name: "Ada",
      last_name: "Lovelace",
      username: "ada",
      avatar: null,
    });
  });

  it("surfaces field errors from a failed registration", async () => {
    await expect(
      register({
        first_name: "Ada",
        last_name: "Lovelace",
        username: "taken",
        password: "password123",
        password2: "password123",
      }),
    ).rejects.toMatchObject({
      status: 400,
      message: "A user with that username already exists.",
    });
  });

  it("loads the current user with a valid access token", async () => {
    const user = await getMe("access-token");

    expect(user.username).toBe("sepide");
    expect(user.first_name).toBe("Sepide");
  });

  it("refreshes an expired access token", async () => {
    const tokens = await refreshToken("refresh-token");

    expect(tokens.access).toBe("new-access-token");
    expect(tokens.refresh).toBe("new-refresh-token");
  });

  it("fails refresh when the refresh token is invalid", async () => {
    await expect(refreshToken("stale")).rejects.toMatchObject({
      status: 401,
      message: "Token is invalid or expired",
    });
  });
});

describe("parseApiError", () => {
  it("reads a string detail", () => {
    expect(parseApiError({ detail: "Nope." }, "fallback")).toBe("Nope.");
  });

  it("reads the first nested field error", () => {
    expect(
      parseApiError(
        { username: ["A user with that username already exists."] },
        "fallback",
      ),
    ).toBe("A user with that username already exists.");
  });

  it("falls back when the body is empty", () => {
    expect(parseApiError(null, "fallback")).toBe("fallback");
  });
});

describe("auth store and session", () => {
  it("persists a login session to localStorage", () => {
    useAuthStore
      .getState()
      .setSession("access-token", "refresh-token", "sepide");

    expect(useAuthStore.getState()).toMatchObject({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      username: "sepide",
      isAuthenticated: true,
    });
    expect(localStorage.getItem("accessToken")).toBe("access-token");
    expect(localStorage.getItem("refreshToken")).toBe("refresh-token");
    expect(localStorage.getItem("username")).toBe("sepide");
  });

  it("drops a missing refresh token on login", () => {
    useAuthStore.getState().setSession("access-token", undefined, "sepide");

    expect(useAuthStore.getState().refreshToken).toBeNull();
    expect(localStorage.getItem("refreshToken")).toBeNull();
  });

  it("keeps the existing refresh token when setTokens omits one", () => {
    useAuthStore
      .getState()
      .setSession("access-token", "refresh-token", "sepide");
    useAuthStore.getState().setTokens("rotated-access");

    expect(useAuthStore.getState().accessToken).toBe("rotated-access");
    expect(useAuthStore.getState().refreshToken).toBe("refresh-token");
  });

  it("hydrates from localStorage", () => {
    localStorage.setItem("accessToken", "stored-access");
    localStorage.setItem("refreshToken", "stored-refresh");
    localStorage.setItem("username", "stored-user");

    useAuthStore.getState().hydrate();

    expect(useAuthStore.getState()).toMatchObject({
      accessToken: "stored-access",
      refreshToken: "stored-refresh",
      username: "stored-user",
      isAuthenticated: true,
      hydrated: true,
    });
  });

  it("clears tokens, username, and the query cache on logout", async () => {
    useAuthStore
      .getState()
      .setSession("access-token", "refresh-token", "sepide");
    queryClient.setQueryData(authKeys.me("admin", "sepide"), {
      username: "sepide",
    });

    await logoutSession();

    expect(useAuthStore.getState()).toMatchObject({
      accessToken: null,
      refreshToken: null,
      username: null,
      isAuthenticated: false,
    });
    expect(localStorage.getItem("accessToken")).toBeNull();
    expect(queryClient.getQueryData(authKeys.me("admin", "sepide"))).toBeUndefined();
  });
});

describe("admin login through useAuth", () => {
  function wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={createTestQueryClient()}>
        {children}
      </QueryClientProvider>
    );
  }

  it("stores the session and returns a profile on admin login", async () => {
    useModeStore.getState().setMode("admin");

    const { result } = renderHook(() => useAuth(), { wrapper });

    await result.current.adminLogin.mutateAsync({
      username: "sepide",
      password: "password123",
    });

    expect(useAuthStore.getState()).toMatchObject({
      accessToken: "access-token",
      refreshToken: "refresh-token",
      username: "sepide",
      isAuthenticated: true,
    });

    await waitFor(() => {
      expect(result.current.user).toEqual({
        id: "sepide",
        name: "Sepide Norouzi",
        username: "sepide",
        avatarUrl: null,
      });
    });
  });

  it("refreshes an expired access token when loading the current user", async () => {
    useModeStore.getState().setMode("admin");
    authState.access = "expired-token";
    useAuthStore
      .getState()
      .setSession("expired-token", "refresh-token", "sepide");

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user?.username).toBe("sepide");
    });

    expect(useAuthStore.getState().accessToken).toBe("new-access-token");
    expect(useAuthStore.getState().refreshToken).toBe("new-refresh-token");
  });

  it("logs out when the session cannot be refreshed", async () => {
    useModeStore.getState().setMode("admin");
    authState.access = "expired-token";
    authState.refresh = "stale-refresh";
    useAuthStore
      .getState()
      .setSession("expired-token", "stale-refresh", "sepide");

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(useAuthStore.getState().isAuthenticated).toBe(false);
    });

    expect(result.current.user).toBeUndefined();
    expect(localStorage.getItem("accessToken")).toBeNull();
  });
});

describe("login page", () => {
  function renderAuth(initialPath = "/auth") {
    const client = createTestQueryClient();

    return render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/dashboard" element={<div>Dashboard home</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  }

  it("shows validation errors when login fields are empty", async () => {
    const user = userEvent.setup();
    renderAuth();

    const form = document.querySelector("form");
    expect(form).not.toBeNull();
    await user.click(within(form!).getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Username is required.")).toBeInTheDocument();
    expect(screen.getByText("Password is required.")).toBeInTheDocument();
  });

  it("shows an API error for invalid credentials", async () => {
    const user = userEvent.setup();
    renderAuth();

    await user.type(screen.getByLabelText("Username"), "sepide");
    await user.type(screen.getByLabelText("Password"), "wrong");

    const form = document.querySelector("form")!;
    await user.click(within(form).getByRole("button", { name: "Sign In" }));

    expect(
      await screen.findByText("Invalid username or password."),
    ).toBeInTheDocument();
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
  });

  it("signs in, switches to admin mode, and navigates to the dashboard", async () => {
    const user = userEvent.setup();
    renderAuth();

    await user.type(screen.getByLabelText("Username"), "sepide");
    await user.type(screen.getByLabelText("Password"), "password123");

    const form = document.querySelector("form")!;
    await user.click(within(form).getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Dashboard home")).toBeInTheDocument();
    expect(useModeStore.getState().mode).toBe("admin");
    expect(useAuthStore.getState()).toMatchObject({
      accessToken: "access-token",
      username: "sepide",
      isAuthenticated: true,
    });
  });

  it("creates an account and returns to the sign-in form", async () => {
    const user = userEvent.setup();
    renderAuth();

    await user.click(screen.getByRole("button", { name: "Create Account" }));

    await user.type(screen.getByLabelText("First name"), "Ada");
    await user.type(screen.getByLabelText("Last name"), "Lovelace");
    await user.type(screen.getByLabelText("Username"), "ada");
    await user.type(screen.getByLabelText("Password"), "password123");
    await user.type(screen.getByLabelText("Confirm password"), "password123");

    const form = document.querySelector("form")!;
    await user.click(
      within(form).getByRole("button", { name: "Create Account" }),
    );

    expect(
      await screen.findByText("Account created. You can sign in now."),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /sign in/i })).toBeInTheDocument();
  });
});

describe("route guards", () => {
  function renderGuarded(initialPath: string) {
    const client = createTestQueryClient();

    return render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboard" element={<div>Protected content</div>} />
            </Route>
            <Route
              path="/auth"
              element={
                <RedirectIfAuthenticated>
                  <div>Auth form</div>
                </RedirectIfAuthenticated>
              }
            />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  }

  it("lets demo users through without a session", () => {
    useModeStore.getState().setMode("demo");
    renderGuarded("/dashboard");

    expect(screen.getByText("Protected content")).toBeInTheDocument();
  });

  it("sends unauthenticated admin users to /auth", () => {
    useModeStore.getState().setMode("admin");
    renderGuarded("/dashboard");

    expect(screen.getByText("Auth form")).toBeInTheDocument();
    expect(screen.queryByText("Protected content")).not.toBeInTheDocument();
  });

  it("lets an authenticated admin into protected routes", async () => {
    useModeStore.getState().setMode("admin");
    useAuthStore
      .getState()
      .setSession("access-token", "refresh-token", "sepide");

    renderGuarded("/dashboard");

    expect(await screen.findByText("Protected content")).toBeInTheDocument();
  });

  it("redirects an already-authenticated admin away from /auth", () => {
    useModeStore.getState().setMode("admin");
    useAuthStore
      .getState()
      .setSession("access-token", "refresh-token", "sepide");

    renderGuarded("/auth");

    expect(screen.getByText("Protected content")).toBeInTheDocument();
    expect(screen.queryByText("Auth form")).not.toBeInTheDocument();
  });

  it("shows the auth form to signed-out admin users", () => {
    useModeStore.getState().setMode("admin");
    renderGuarded("/auth");

    expect(screen.getByText("Auth form")).toBeInTheDocument();
  });
});

describe("settings auth actions", () => {
  function renderActions(initialPath = "/settings") {
    const client = createTestQueryClient();

    return render(
      <QueryClientProvider client={client}>
        <MemoryRouter initialEntries={[initialPath]}>
          <Routes>
            <Route path="/settings" element={<SettingsActions />} />
            <Route path="/" element={<div>Intro</div>} />
            <Route path="/progress" element={<div>Progress</div>} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>,
    );
  }

  it("logs an admin out, switches to demo, and returns home", async () => {
    const user = userEvent.setup();
    useModeStore.getState().setMode("admin");
    useAuthStore
      .getState()
      .setSession("access-token", "refresh-token", "sepide");

    renderActions();

    await user.click(screen.getByRole("button", { name: "Log Out" }));

    expect(await screen.findByText("Intro")).toBeInTheDocument();
    expect(useModeStore.getState().mode).toBe("demo");
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(localStorage.getItem("accessToken")).toBeNull();
  });

  it("sends demo users toward sign-in", async () => {
    const user = userEvent.setup();
    useModeStore.getState().setMode("demo");

    renderActions();

    await user.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Progress")).toBeInTheDocument();
  });
});

describe("auth query keys", () => {
  it("scopes the current-user query by mode and username", () => {
    expect(authKeys.me("admin", "sepide")).toEqual([
      "auth",
      "me",
      "admin",
      "sepide",
    ]);
    expect(authKeys.me("demo")).toEqual(["auth", "me", "demo"]);
  });
});

describe("AuthHttpError", () => {
  it("preserves the HTTP status", () => {
    const error = new AuthHttpError("Not authenticated.", 401);

    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("AuthHttpError");
    expect(error.status).toBe(401);
  });
});
