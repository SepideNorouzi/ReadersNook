import { beforeEach, describe, expect, it } from "vitest";
import { render, renderHook, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";

import { server } from "../data/server";
import { queryClient } from "../lib/queryClient";
import { authHandlers, createAuthApiState } from "../test/authHandlers";
import { mockAuthUser, mockProfile } from "../test/fixtures";
import { useModeStore } from "../store/modeStore";
import { useThemeStore } from "../store/themeStore";
import { profile as demoProfile } from "./data/profile";
import { useDemoProfileStore } from "./store/demoProfileStore";
import { useAuthStore } from "./store/authStore";
import { toProfile, updateAvatar, updateName } from "./services/auth";
import { useAuth } from "./hooks/useAuth";
import { useProfileEditor } from "./hooks/useProfileEditor";
import type { AuthUser, Profile } from "./types/auth";
import ProfileHeader from "../features/settings/ProfileHeader";

function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
}

function wrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={createTestQueryClient()}>
      {children}
    </QueryClientProvider>
  );
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
  useThemeStore.getState().setTheme("light");
  queryClient.clear();
}

let authState = createAuthApiState();

beforeEach(() => {
  resetClientState();
  authState = createAuthApiState();
  server.use(...authHandlers(authState));
});

describe("user data shapes", () => {
  it("maps the backend AuthUser into the UI Profile fields", () => {
    const raw: AuthUser = mockAuthUser({
      first_name: "Sepide",
      last_name: "Norouzi",
      username: "sepide",
      avatar: "/avatars/00.png",
    });

    const profile = toProfile(raw);

    expect(profile).toEqual({
      id: "sepide",
      name: "Sepide Norouzi",
      username: "sepide",
      avatarUrl: "/avatars/00.png",
    });
    expect(Object.keys(profile).sort()).toEqual([
      "avatarUrl",
      "id",
      "name",
      "username",
    ]);
  });

  it("uses the username when both name parts are empty", () => {
    expect(
      toProfile(
        mockAuthUser({ first_name: "", last_name: "", username: "guest" }),
      ),
    ).toMatchObject({
      id: "guest",
      name: "guest",
      username: "guest",
    });
  });

  it("trims a missing last name so the display name is just the first name", () => {
    expect(
      toProfile(mockAuthUser({ first_name: "Sepide", last_name: "" })),
    ).toMatchObject({ name: "Sepide" });
  });

  it("keeps extra name parts on last_name when splitting a full name", async () => {
    const updated = await updateName("access-token", "Sepide Maryam Norouzi");

    expect(updated.first_name).toBe("Sepide");
    expect(updated.last_name).toBe("Maryam Norouzi");
    expect(toProfile(updated).name).toBe("Sepide Maryam Norouzi");
  });

  it("starts demo users on the guest profile", () => {
    expect(demoProfile).toEqual({
      id: "guest",
      name: "Guest",
      username: "guest",
      avatarUrl: null,
    } satisfies Profile);
    expect(useDemoProfileStore.getState().profile).toEqual(demoProfile);
  });

  it("does not store app mode on the profile — mode lives on the mode store", () => {
    const profile = mockProfile();

    expect("mode" in profile).toBe(false);
    expect(useModeStore.getState().mode).toBe("demo");

    useModeStore.getState().setMode("admin");

    expect(useModeStore.getState().mode).toBe("admin");
    expect(localStorage.getItem("appMode")).toBe("admin");
    expect(useDemoProfileStore.getState().profile).toEqual(demoProfile);
  });
});

describe("demo profile updates", () => {
  it("updates name and avatar on the demo store", () => {
    const store = useDemoProfileStore.getState();

    store.setName("Ada Lovelace");
    store.setAvatar("/avatars/03.png");

    expect(useDemoProfileStore.getState().profile).toEqual({
      id: "guest",
      name: "Ada Lovelace",
      username: "guest",
      avatarUrl: "/avatars/03.png",
    });
  });

  it("resets demo profile back to guest", () => {
    useDemoProfileStore.getState().setName("Changed");
    useDemoProfileStore.getState().setAvatar("/avatars/01.png");
    useDemoProfileStore.getState().resetProfile();

    expect(useDemoProfileStore.getState().profile).toEqual(demoProfile);
  });

  it("exposes the demo profile through useAuth", () => {
    useModeStore.getState().setMode("demo");
    useDemoProfileStore.getState().setName("Reader");
    useDemoProfileStore.getState().setAvatar("/avatars/02.png");

    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toEqual({
      id: "guest",
      name: "Reader",
      username: "guest",
      avatarUrl: "/avatars/02.png",
    });
    expect(result.current.userLoading).toBe(false);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it("updates demo name and avatar through the profile editor", async () => {
    useModeStore.getState().setMode("demo");

    const { result } = renderHook(
      () => ({
        auth: useAuth(),
        editor: useProfileEditor(),
      }),
      { wrapper },
    );

    await result.current.editor.updateName("Mina");
    await result.current.editor.updateAvatar("/avatars/04.png");

    await waitFor(() => {
      expect(result.current.auth.user).toEqual({
        id: "guest",
        name: "Mina",
        username: "guest",
        avatarUrl: "/avatars/04.png",
      });
    });
  });
});

describe("admin profile updates", () => {
  function startAdminSession() {
    useModeStore.getState().setMode("admin");
    useAuthStore
      .getState()
      .setSession("access-token", "refresh-token", "sepide");
  }

  it("PATCHes avatar and returns the updated AuthUser", async () => {
    const updated = await updateAvatar("access-token", "/avatars/01.png");

    expect(updated.avatar).toBe("/avatars/01.png");
    expect(updated.username).toBe("sepide");
  });

  it("PATCHes a split first/last name", async () => {
    const updated = await updateName("access-token", "Ada Lovelace");

    expect(updated).toMatchObject({
      first_name: "Ada",
      last_name: "Lovelace",
      username: "sepide",
    });
  });

  it("loads the signed-in profile through useAuth", async () => {
    startAdminSession();
    authState.user = mockAuthUser({
      avatar: "/avatars/00.png",
    });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await waitFor(() => {
      expect(result.current.user).toEqual({
        id: "sepide",
        name: "Sepide Norouzi",
        username: "sepide",
        avatarUrl: "/avatars/00.png",
      });
    });
    expect(result.current.isAuthenticated).toBe(true);
  });

  it("updates name and avatar for a signed-in account", async () => {
    startAdminSession();

    const { result } = renderHook(
      () => ({
        auth: useAuth(),
        editor: useProfileEditor(),
      }),
      { wrapper },
    );

    await waitFor(() => {
      expect(result.current.auth.user?.username).toBe("sepide");
    });

    await result.current.editor.updateName("Ada Lovelace");
    await result.current.editor.updateAvatar("/avatars/05.png");

    await waitFor(() => {
      expect(result.current.auth.user).toEqual({
        id: "sepide",
        name: "Ada Lovelace",
        username: "sepide",
        avatarUrl: "/avatars/05.png",
      });
    });

    expect(authState.user).toMatchObject({
      first_name: "Ada",
      last_name: "Lovelace",
      avatar: "/avatars/05.png",
    });
  });

  it("retries a name update after refreshing an expired access token", async () => {
    useModeStore.getState().setMode("admin");
    authState.access = "expired-token";
    useAuthStore
      .getState()
      .setSession("expired-token", "refresh-token", "sepide");

    const { result } = renderHook(() => useProfileEditor(), { wrapper });

    await result.current.updateName("New Name");

    expect(authState.user.first_name).toBe("New");
    expect(authState.user.last_name).toBe("Name");
    expect(useAuthStore.getState().accessToken).toBe("new-access-token");
  });
});

describe("profile header edits", () => {
  function ProfileHarness() {
    const { user } = useAuth();
    const [showAvatarPicker, setShowAvatarPicker] = useState(false);

    if (!user) return null;

    return (
      <ProfileHeader
        user={user}
        showAvatarPicker={showAvatarPicker}
        onAvatarPickerChange={setShowAvatarPicker}
      />
    );
  }

  it("edits the demo display name from the profile header", async () => {
    const user = userEvent.setup();
    useModeStore.getState().setMode("demo");

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <ProfileHarness />
      </QueryClientProvider>,
    );

    expect(screen.getByText("Welcome back, Guest")).toBeInTheDocument();
    expect(screen.getByText("Browsing in demo mode")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Edit name" }));
    const input = screen.getByDisplayValue("Guest");
    await user.clear(input);
    await user.type(input, "Mina");
    await user.click(screen.getByRole("button", { name: "Save name" }));

    expect(await screen.findByText("Welcome back, Mina")).toBeInTheDocument();
    expect(useDemoProfileStore.getState().profile.name).toBe("Mina");
  });

  it("rejects an empty name", async () => {
    const user = userEvent.setup();
    useModeStore.getState().setMode("demo");

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <ProfileHarness />
      </QueryClientProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Edit name" }));
    await user.clear(screen.getByDisplayValue("Guest"));
    await user.click(screen.getByRole("button", { name: "Save name" }));

    expect(screen.getByText("Name can't be empty.")).toBeInTheDocument();
    expect(useDemoProfileStore.getState().profile.name).toBe("Guest");
  });

  it("picks an avatar from the profile header", async () => {
    const user = userEvent.setup();
    useModeStore.getState().setMode("demo");

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <ProfileHarness />
      </QueryClientProvider>,
    );

    await user.click(
      screen.getByRole("button", { name: "Change profile avatar" }),
    );
    await user.click(screen.getByRole("button", { name: "Use this avatar" }));

    expect(useDemoProfileStore.getState().profile.avatarUrl).toBe(
      "/avatars/00.png",
    );
    expect(await screen.findByAltText("Guest")).toHaveAttribute(
      "src",
      "/avatars/00.png",
    );
  });

  it("edits the signed-in member name through the profile header", async () => {
    const user = userEvent.setup();
    useModeStore.getState().setMode("admin");
    useAuthStore
      .getState()
      .setSession("access-token", "refresh-token", "sepide");

    render(
      <QueryClientProvider client={createTestQueryClient()}>
        <ProfileHarness />
      </QueryClientProvider>,
    );

    expect(
      await screen.findByText("Welcome back, Sepide Norouzi"),
    ).toBeInTheDocument();
    expect(screen.getByText("Reader's Nook Member")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Edit name" }));
    const input = screen.getByDisplayValue("Sepide Norouzi");
    await user.clear(input);
    await user.type(input, "Ada Lovelace");
    await user.click(screen.getByRole("button", { name: "Save name" }));

    expect(
      await screen.findByText("Welcome back, Ada Lovelace"),
    ).toBeInTheDocument();
    expect(authState.user).toMatchObject({
      first_name: "Ada",
      last_name: "Lovelace",
    });
  });
});

describe("appearance mode", () => {
  it("toggles night mode independently of the user profile", () => {
    expect(useThemeStore.getState().theme).toBe("light");

    useThemeStore.getState().toggleTheme();

    expect(useThemeStore.getState().theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(useDemoProfileStore.getState().profile).toEqual(demoProfile);
  });
});
