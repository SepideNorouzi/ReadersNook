import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router";
import { delay, http, HttpResponse } from "msw";
import type { ReactNode } from "react";

import Settings from "../../pages/Settings";
import { avatarOptions } from "../../lib/avatars";

import { server } from "../../data/server";
import { books as demoBooks } from "../../data/book";
import { profile as demoProfile } from "../../auth/data/profile";
import { mockApiBook, mockAuthUser } from "../../test/fixtures";

import { useModeStore } from "../../store/modeStore";
import { useThemeStore } from "../../store/themeStore";
import { useReadingGoalStore } from "../../store/readingGoalStore";
import { useBookStore } from "../../store/demoBookStore";
import { useDemoProfileStore } from "../../auth/store/demoProfileStore";
import { useAuthStore } from "../../auth/store/authStore";

import type { AuthUser } from "../../auth/types/auth";
import type { ApiLibrary, ApiLibraryEntry } from "../../types/api/apiBook";
import { API_URL } from "../../lib/env";

let reducedMotion = false;

function statValue(label: string) {
  const labelNode = screen.getByText(label);
  return labelNode.previousElementSibling?.textContent;
}

function goalValue() {
  const section = document.getElementById("reading-goal");
  if (!section) {
    throw new Error("Reading goal section was not rendered.");
  }
  return within(section).getByText("books this year").previousElementSibling
    ?.textContent;
}

function mockLibrary(books: ApiLibraryEntry[] = []): ApiLibrary {
  return {
    id: 1,
    reading_goal: 12,
    books,
    collections: [],
    created_at: "2026-01-01T00:00:00Z",
    updated_at: "2026-01-01T00:00:00Z",
  };
}

// Independent copy of the backend's AVATAR_CHOICES. Deliberately NOT derived
// from avatarOptions, so a renamed or drifted id makes a test fail.
// Keep it identical to your Django choices.
const BACKEND_AVATAR_IDS = [
  "dreamer",
  "curious-reader",
  "adventurer",
  "scholar",
  "storyteller",
  "bookworm",
];

function seedAdmin(options?: {
  user?: Partial<AuthUser>;
  libraryBooks?: ApiLibraryEntry[];
  delayMeMs?: number;
}) {
  let currentUser: AuthUser = mockAuthUser(options?.user);
  const patches: Partial<AuthUser>[] = [];

  useModeStore.getState().setMode("admin");
  useAuthStore
    .getState()
    .setSession("access-token", "refresh-token", currentUser.username);

  server.use(
    http.get(`${API_URL}/auth/me/`, async () => {
      if (options?.delayMeMs) await delay(options.delayMeMs);
      return HttpResponse.json(currentUser);
    }),
    http.patch(`${API_URL}/auth/me/`, async ({ request }) => {
      const body = (await request.json()) as Partial<AuthUser>;
      patches.push(body);

      // mimic DRF's ChoiceField
      if (body.avatar && !BACKEND_AVATAR_IDS.includes(body.avatar)) {
        return HttpResponse.json(
          { avatar: [`"${body.avatar}" is not a valid choice.`] },
          { status: 400 },
        );
      }

      currentUser = { ...currentUser, ...body };
      return HttpResponse.json(currentUser);
    }),
    http.get(`${API_URL}/library/`, () =>
      HttpResponse.json(mockLibrary(options?.libraryBooks ?? [])),
    ),
  );

  return {
    getUser: () => currentUser,
    patches, // ← new
  };
}

function renderSettings(path = "/settings") {
  const client = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  function wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    );
  }

  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/settings" element={<Settings />} />
        <Route path="/" element={<div>Home page</div>} />
        <Route path="/auth" element={<div>Auth page</div>} />
      </Routes>
    </MemoryRouter>,
    { wrapper },
  );
}

beforeEach(() => {
  reducedMotion = false;

  Object.defineProperty(window, "matchMedia", {
    writable: true,
    configurable: true,
    value: (query: string) => ({
      matches:
        query === "(prefers-reduced-motion: reduce)" ? reducedMotion : false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  HTMLElement.prototype.scrollIntoView = vi.fn();

  localStorage.clear();
  useModeStore.getState().setMode("demo");
  useThemeStore.getState().setTheme("light");
  useReadingGoalStore.getState().resetReadingGoal();
  useBookStore.getState().resetBooks();
  useDemoProfileStore.getState().resetProfile();
  useAuthStore.getState().logout();
});

describe("settings page — demo mode", () => {
  it("renders the guest Profile and demo library stats", async () => {
    renderSettings();

    expect(
      await screen.findByRole("heading", {
        name: `Welcome back, ${demoProfile.name}`,
      }),
    ).toBeInTheDocument();

    expect(screen.getByText("Browsing in demo mode")).toBeInTheDocument();
    expect(screen.getByText("Your reading space")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Preferences" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Customize your reading experience."),
    ).toBeInTheDocument();

    const books = useBookStore.getState().books;
    expect(books).toHaveLength(demoBooks.length);

    expect(statValue("Books Read")).toBe(
      String(demoBooks.filter((book) => book.status === "read").length),
    );
    expect(statValue("Currently Reading")).toBe(
      String(demoBooks.filter((book) => book.status === "current").length),
    );
    expect(statValue("To Be Read")).toBe(
      String(demoBooks.filter((book) => book.status === "tbr").length),
    );
  });

  it("shows the avatar reminder until it is dismissed", async () => {
    const user = userEvent.setup();
    renderSettings();

    expect(
      await screen.findByRole("heading", { name: /Make your profile yours/ }),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Dismiss notification" }),
    );

    expect(
      screen.queryByRole("heading", { name: /Make your profile yours/ }),
    ).not.toBeInTheDocument();
  });

  it("opens the avatar picker from the reminder and saves into the demo profile store", async () => {
    const user = userEvent.setup();
    renderSettings();

    await user.click(
      await screen.findByRole("button", { name: "Choose my avatar" }),
    );

    expect(
      screen.queryByRole("heading", { name: /Make your profile yours/ }),
    ).not.toBeInTheDocument();
    expect(screen.getByText("Pick your avatar")).toBeInTheDocument();
    expect(screen.getByText(avatarOptions[0].name)).toBeInTheDocument();
    expect(screen.getByText(`1 / ${avatarOptions.length}`)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Next avatar" }));
    expect(screen.getByText(avatarOptions[1].name)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Use this avatar" }));

    await waitFor(() => {
      expect(useDemoProfileStore.getState().profile.avatarUrl).toBe(
        avatarOptions[1].src,
      );
    });

    expect(screen.queryByText("Pick your avatar")).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: demoProfile.name })).toHaveAttribute(
      "src",
      avatarOptions[1].src,
    );
    expect(
      screen.queryByRole("heading", { name: /Make your profile yours/ }),
    ).not.toBeInTheDocument();
  });

  it("lets the avatar carousel wrap, cancel, and respond to keyboard and swipe", async () => {
    const user = userEvent.setup();
    renderSettings();

    await user.click(
      await screen.findByRole("button", { name: "Change profile avatar" }),
    );

    await user.click(screen.getByRole("button", { name: "Previous avatar" }));
    expect(
      screen.getByText(avatarOptions[avatarOptions.length - 1].name),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: `Choose ${avatarOptions[2].name}` }),
    );
    expect(screen.getByText(avatarOptions[2].name)).toBeInTheDocument();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByText(avatarOptions[3].name)).toBeInTheDocument();

    await user.keyboard("{ArrowLeft}");
    expect(screen.getByText(avatarOptions[2].name)).toBeInTheDocument();

    const carousel = document.querySelector(".avatar-carousel");
    expect(carousel).not.toBeNull();

    fireEvent.touchStart(carousel!, {
      changedTouches: [{ clientX: 200 }],
    });
    fireEvent.touchEnd(carousel!, {
      changedTouches: [{ clientX: 120 }],
    });
    expect(screen.getByText(avatarOptions[3].name)).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByText("Pick your avatar")).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Change profile avatar" }),
    );
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByText("Pick your avatar")).not.toBeInTheDocument();
  });

  it("edits the guest name through the demo profile store", async () => {
    const user = userEvent.setup();
    renderSettings();

    await user.click(await screen.findByRole("button", { name: "Edit name" }));

    const input = screen.getByDisplayValue(demoProfile.name);
    await user.clear(input);
    await user.type(input, "Reader Guest");
    await user.click(screen.getByRole("button", { name: "Save name" }));

    expect(
      await screen.findByRole("heading", {
        name: "Welcome back, Reader Guest",
      }),
    ).toBeInTheDocument();
    expect(useDemoProfileStore.getState().profile).toMatchObject({
      id: "guest",
      username: "guest",
      name: "Reader Guest",
    });
  });

  it("rejects an empty name and cancels without writing to the store", async () => {
    const user = userEvent.setup();
    renderSettings();

    await user.click(await screen.findByRole("button", { name: "Edit name" }));

    const input = screen.getByDisplayValue(demoProfile.name);
    await user.clear(input);
    await user.click(screen.getByRole("button", { name: "Save name" }));

    expect(screen.getByText("Name can't be empty.")).toBeInTheDocument();
    expect(useDemoProfileStore.getState().profile.name).toBe(demoProfile.name);

    await user.click(
      screen.getByRole("button", { name: "Cancel editing name" }),
    );
    expect(
      screen.queryByDisplayValue(demoProfile.name),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: `Welcome back, ${demoProfile.name}`,
      }),
    ).toBeInTheDocument();
  });

  it("closes the name editor when the value is unchanged", async () => {
    const user = userEvent.setup();
    renderSettings();

    await user.click(await screen.findByRole("button", { name: "Edit name" }));
    await user.keyboard("{Enter}");

    expect(
      screen.queryByDisplayValue(demoProfile.name),
    ).not.toBeInTheDocument();
    expect(useDemoProfileStore.getState().profile.name).toBe(demoProfile.name);
  });

  it("updates the yearly reading goal and clamps it between 1 and 365", async () => {
    const user = userEvent.setup();
    renderSettings();

    expect(goalValue()).toBe("12");

    await user.click(
      screen.getByRole("button", { name: "Increase reading goal" }),
    );
    expect(goalValue()).toBe("13");
    expect(useReadingGoalStore.getState().readingGoal).toBe(13);

    await user.click(
      screen.getByRole("button", { name: "Decrease reading goal" }),
    );
    expect(goalValue()).toBe("12");

    useReadingGoalStore.getState().setReadingGoal(1);
    await user.click(
      screen.getByRole("button", { name: "Decrease reading goal" }),
    );
    expect(goalValue()).toBe("1");
    expect(useReadingGoalStore.getState().readingGoal).toBe(1);

    useReadingGoalStore.getState().setReadingGoal(365);
    await user.click(
      screen.getByRole("button", { name: "Increase reading goal" }),
    );
    expect(goalValue()).toBe("365");
    expect(useReadingGoalStore.getState().readingGoal).toBe(365);
  });

  it("toggles night mode on the document and in the theme store", async () => {
    const user = userEvent.setup();
    renderSettings();

    const toggle = await screen.findByRole("button", {
      name: "Toggle dark mode",
    });

    expect(toggle).toHaveAttribute("aria-pressed", "false");
    expect(document.documentElement).not.toHaveClass("dark");

    await user.click(toggle);

    expect(toggle).toHaveAttribute("aria-pressed", "true");
    expect(document.documentElement).toHaveClass("dark");
    expect(useThemeStore.getState().theme).toBe("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("sends a demo reader to sign in", async () => {
    const user = userEvent.setup();
    renderSettings();

    await user.click(await screen.findByRole("button", { name: "Sign In" }));

    expect(screen.getByText("Auth page")).toBeInTheDocument();
    expect(useModeStore.getState().mode).toBe("demo");
  });

  it("scrolls to the reading goal when the settings hash is present", async () => {
    renderSettings("/settings#reading-goal");

    await waitFor(() => {
      expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: "smooth",
        block: "start",
      });
    });

    reducedMotion = true;
    vi.mocked(HTMLElement.prototype.scrollIntoView).mockClear();
    renderSettings("/settings#reading-goal");

    await waitFor(() => {
      expect(HTMLElement.prototype.scrollIntoView).toHaveBeenCalledWith({
        behavior: "auto",
        block: "start",
      });
    });
  });
});

describe("settings page — admin mode", () => {
  it("maps AuthUser through to Profile and counts ApiLibraryEntry statuses", async () => {
    const libraryBooks = [
      mockApiBook({ id: 1, status: "read" }),
      mockApiBook({ id: 2, status: "read" }),
      mockApiBook({
        id: 3,
        status: "current",
        book: mockApiBook().book,
      }),
      mockApiBook({ id: 4, status: "tbr" }),
      mockApiBook({ id: 5, status: "tbr" }),
      mockApiBook({ id: 6, status: "tbr" }),
    ];
    // Rebuild current entry with a distinct catalog book so titles stay unique.
    libraryBooks[2] = mockApiBook({
      id: 3,
      status: "current",
      current_page: 40,
      book: mockApiBook().book,
    });

    seedAdmin({
      user: mockAuthUser({
        first_name: "Sepide",
        last_name: "Norouzi",
        username: "sepide",
        avatar: avatarOptions[3].id,
      }),
      libraryBooks,
    });

    renderSettings();

    expect(
      await screen.findByRole("heading", {
        name: "Welcome back, Sepide Norouzi",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("Reader's Nook Member")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Sepide Norouzi" })).toHaveAttribute(
      "src",
      avatarOptions[3].src,
    );
    expect(
      screen.queryByRole("heading", { name: /Make your profile yours/ }),
    ).not.toBeInTheDocument();

    expect(statValue("Books Read")).toBe("2");
    expect(statValue("Currently Reading")).toBe("1");
    expect(statValue("To Be Read")).toBe("3");

    expect(screen.getByRole("button", { name: "Log Out" })).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Sign In" }),
    ).not.toBeInTheDocument();
  });

  it("falls back to username when AuthUser has no first or last name", async () => {
    seedAdmin({
      user: mockAuthUser({
        first_name: "",
        last_name: "",
        username: "sepide",
        avatar: null,
      }),
    });

    renderSettings();

    expect(
      await screen.findByRole("heading", { name: "Welcome back, sepide" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Reader's Nook Member")).toBeInTheDocument();
    expect(
      await screen.findByRole("heading", { name: /Make your profile yours/ }),
    ).toBeInTheDocument();
  });

  it("patches first_name and last_name when the member edits their name", async () => {
    const admin = seedAdmin();
    const user = userEvent.setup();
    renderSettings();

    await user.click(await screen.findByRole("button", { name: "Edit name" }));

    const input = screen.getByDisplayValue("Sepide Norouzi");
    await user.clear(input);
    await user.type(input, "Sepide Reader");
    await user.click(screen.getByRole("button", { name: "Save name" }));

    expect(
      await screen.findByRole("heading", {
        name: "Welcome back, Sepide Reader",
      }),
    ).toBeInTheDocument();
    expect(admin.getUser()).toMatchObject({
      first_name: "Sepide",
      last_name: "Reader",
      username: "sepide",
    });
  });

  it("patches the avatar id on the AuthUser and shows the resolved image", async () => {
    const admin = seedAdmin({ user: mockAuthUser({ avatar: null }) });
    const user = userEvent.setup();
    renderSettings();

    await user.click(
      await screen.findByRole("button", { name: "Change profile avatar" }),
    );
    await user.click(
      screen.getByRole("button", { name: `Choose ${avatarOptions[4].name}` }),
    );
    await user.click(screen.getByRole("button", { name: "Use this avatar" }));

    await waitFor(() => {
      expect(admin.getUser().avatar).toBe(avatarOptions[4].id);
    });
    // The exact wire payload: one request, id only, no path and no extra fields.
    expect(admin.patches).toEqual([{ avatar: avatarOptions[4].id }]);

    // findBy: the server changes before React re-renders.
    expect(
      await screen.findByRole("img", { name: "Sepide Norouzi" }),
    ).toHaveAttribute("src", avatarOptions[4].src);
  });

  it("sends exactly one PATCH when Enter is pressed on the focused confirm button", async () => {
    const admin = seedAdmin();
    const user = userEvent.setup();
    renderSettings();

    await user.click(
      await screen.findByRole("button", { name: "Change profile avatar" }),
    );
    screen.getByRole("button", { name: "Use this avatar" }).focus();
    await user.keyboard("{Enter}");

    await waitFor(() =>
      expect(screen.queryByText("Pick your avatar")).not.toBeInTheDocument(),
    );
    expect(admin.patches).toHaveLength(1); // two would mean keydown + click both fired
  });

  it("shows a loading state while the admin profile query is in flight", async () => {
    seedAdmin({ delayMeMs: 75 });
    renderSettings();

    expect(screen.getByText("Loading your profile...")).toBeInTheDocument();

    expect(
      await screen.findByRole("heading", {
        name: "Welcome back, Sepide Norouzi",
      }),
    ).toBeInTheDocument();
  });

  it("shows an error when admin mode has no session", async () => {
    useModeStore.getState().setMode("admin");
    renderSettings();

    expect(
      await screen.findByText("Couldn't load profile."),
    ).toBeInTheDocument();
  });

  it("surfaces avatar update failures from the admin API", async () => {
    seedAdmin();
    server.use(
      http.patch(`${API_URL}/auth/me/`, () =>
        HttpResponse.json(
          { detail: "Avatar storage is unavailable." },
          { status: 500 },
        ),
      ),
    );

    const user = userEvent.setup();
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    renderSettings();

    await user.click(
      await screen.findByRole("button", { name: "Change profile avatar" }),
    );
    await user.click(screen.getByRole("button", { name: "Use this avatar" }));

    expect(
      await screen.findByText("Avatar storage is unavailable."),
    ).toBeInTheDocument();
    expect(screen.getByText("Pick your avatar")).toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it("logs out of admin, switches back to demo, and leaves settings", async () => {
    seedAdmin();
    const user = userEvent.setup();
    renderSettings();

    await user.click(await screen.findByRole("button", { name: "Log Out" }));

    expect(await screen.findByText("Home page")).toBeInTheDocument();
    expect(useModeStore.getState().mode).toBe("demo");
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(useAuthStore.getState().accessToken).toBeNull();
    expect(localStorage.getItem("accessToken")).toBeNull();
  });
});
