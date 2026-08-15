import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, signupSchema } from "../auth/schemas/authSchema";
import { useAuth } from "../auth/hooks/useAuth";
import Card from "../components/ui/Card";
import { useModeStore } from "../store/modeStore";

// Combined shape covers both modes; RHF needs one type to register against,
// and fields only relevant to signup are simply optional here.
type AuthFormValues = {
  first_name?: string;
  last_name?: string;
  username: string;
  password: string;
  password2?: string;
};

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authInfo, setAuthInfo] = useState("");

  const { login, adminLogin, register: registerUser } = useAuth();
  const setMode = useModeStore((state) => state.setMode);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(isLogin ? loginSchema : signupSchema),
  });

  const isPending =
    login.isPending || adminLogin.isPending || registerUser.isPending;

  async function onSubmit(data: AuthFormValues) {
    setAuthError("");
    setAuthInfo("");

    try {
      if (isLogin) {
        await login.mutateAsync({
          username: data.username,
          password: data.password,
        });
        reset();
      } else {
        await registerUser.mutateAsync({
          first_name: data.first_name!,
          last_name: data.last_name!,
          username: data.username,
          password: data.password,
          password2: data.password2!,
        });
        // No auto-login on signup yet — surface a clear next step instead.
        setAuthInfo("Account created — you can sign in now.");
        setIsLogin(true);
        reset();
      }
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";
      setAuthError(message);
    }
  }

  const quickLoginHandler = async () => {
    setAuthError("");

    try {
      setMode("admin");

      await adminLogin.mutateAsync({
        username: import.meta.env.VITE_DEV_USERNAME,
        password: import.meta.env.VITE_DEV_PASSWORD,
      });

      navigate("/dashboard");
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Dev login failed. Please try again.";

      setAuthError(message);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-semibold text-[var(--text)]">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            {isLogin
              ? "Sign in to get back to your library."
              : "Start tracking what you read."}
          </p>
        </div>

        <form
          key={isLogin ? "login" : "signup"}
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isLogin ? "max-h-0 opacity-0" : "max-h-40 opacity-100"
            }`}
          >
            {!isLogin && (
              <div className="grid grid-cols-2 gap-3 pb-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
                    First name
                  </label>
                  <input
                    {...register("first_name")}
                    type="text"
                    placeholder="Sepide"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--stone-100)] px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-[var(--brown-600)]"
                  />
                  {errors.first_name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.first_name.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
                    Last name
                  </label>
                  <input
                    {...register("last_name")}
                    type="text"
                    placeholder="Norouzi"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--stone-100)] px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-[var(--brown-600)]"
                  />
                  {errors.last_name && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.last_name.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
              Username
            </label>
            <input
              {...register("username")}
              type="text"
              placeholder="sepide"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--stone-100)] px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-[var(--brown-600)]"
            />
            {errors.username && (
              <p className="mt-1 text-xs text-red-500">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
              Password
            </label>
            <input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-[var(--border)] bg-[var(--stone-100)] px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-[var(--brown-600)]"
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              isLogin ? "max-h-0 opacity-0" : "max-h-24 opacity-100"
            }`}
          >
            {!isLogin && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[var(--text)]">
                  Confirm password
                </label>
                <input
                  {...register("password2")}
                  type="password"
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-[var(--border)] bg-[var(--stone-100)] px-4 py-2.5 outline-none transition focus:ring-2 focus:ring-[var(--brown-600)]"
                />
                {errors.password2 && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.password2.message}
                  </p>
                )}
              </div>
            )}
          </div>

          {authError && <p className="text-sm text-red-500">{authError}</p>}
          {authInfo && <p className="text-sm text-emerald-600">{authInfo}</p>}

          <button
            disabled={isPending}
            className="mt-2 w-full rounded-2xl bg-[var(--brown-600)] py-3 text-base font-semibold text-white transition hover:bg-[var(--brown-700)] disabled:opacity-60"
          >
            {isPending
              ? "Please wait…"
              : isLogin
                ? "Sign In"
                : "Create Account"}
          </button>

          {import.meta.env.DEV && (
            <button
              type="button"
              disabled={isPending}
              onClick={quickLoginHandler}
              className="w-full rounded-xl border border-dashed border-[var(--border)] py-2 text-xs text-[var(--text-muted)] disabled:opacity-60"
            >
              {adminLogin.isPending ? "Signing in..." : "Dev quick login"}
            </button>
          )}
        </form>

        <div className="text-center text-sm text-[var(--text-secondary)]">
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <button
            type="button"
            onClick={() => {
              setIsLogin((prev) => !prev);
              reset();
              setAuthError("");
              setAuthInfo("");
            }}
            className="ml-2 font-semibold text-[var(--brown-600)]"
          >
            {isLogin ? "Create one" : "Sign In"}
          </button>
        </div>
      </Card>
    </main>
  );
}
