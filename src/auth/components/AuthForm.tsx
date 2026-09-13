import { useState } from "react";
import { ArrowRight, Eye, EyeOff, LockKeyhole, UserRound } from "lucide-react";
import type {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";

import type { AuthFormValues } from "../hooks/useAuthForm";
import FormField from "./FormField";

type AuthFormProps = {
  isLogin: boolean;
  isPending: boolean;
  authError: string;
  authInfo: string;

  errors: FieldErrors<AuthFormValues>;
  register: UseFormRegister<AuthFormValues>;
  handleSubmit: UseFormHandleSubmit<AuthFormValues>;

  onSubmit: (data: AuthFormValues) => Promise<void>;
  switchMode: (login: boolean) => void;
};

export default function AuthForm({
  isLogin,
  isPending,
  authError,
  authInfo,
  errors,
  register,
  handleSubmit,
  onSubmit,
  switchMode,
}: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  function handleModeChange(login: boolean) {
    setShowPassword(false);
    setShowPassword2(false);
    switchMode(login);
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center">
        <p
          className="
            mb-2 text-[10px]
            font-bold uppercase
            tracking-[0.18em]
            text-[var(--gold)]
          "
        >
          {isLogin ? "Welcome back" : "Begin your journey"}
        </p>

        <h1
          className="
            font-heading
            text-3xl font-semibold
            tracking-tight
            text-[var(--text)]
            sm:text-[34px]
          "
        >
          {isLogin ? "Sign in to Readers' Nook" : "Create your account"}
        </h1>
      </div>

      {/* Mode switch */}
      <div
        className="
          mt-7
          grid grid-cols-2
          rounded-2xl
          border border-[var(--border)]
          bg-[var(--stone-100)]
          p-1
        "
      >
        <button
          type="button"
          onClick={() => handleModeChange(true)}
          className={`
            rounded-xl px-4 py-2.5
            text-sm font-semibold
            transition-all duration-200
            ${
              isLogin
                ? `
                  bg-[var(--surface)]
                  text-[var(--text)]
                  shadow-[var(--shadow-sm)]
                `
                : `
                  text-[var(--text-muted)]
                  hover:text-[var(--text)]
                `
            }
          `}
        >
          Sign In
        </button>

        <button
          type="button"
          onClick={() => handleModeChange(false)}
          className={`
            rounded-xl px-4 py-2.5
            text-sm font-semibold
            transition-all duration-200
            ${
              !isLogin
                ? `
                  bg-[var(--surface)]
                  text-[var(--text)]
                  shadow-[var(--shadow-sm)]
                `
                : `
                  text-[var(--text-muted)]
                  hover:text-[var(--text)]
                `
            }
          `}
        >
          Create Account
        </button>
      </div>

      {/* Form */}
      <form
        key={isLogin ? "login" : "signup"}
        onSubmit={handleSubmit(onSubmit)}
        className="mt-7 space-y-4"
      >
        {/* Names */}
        {!isLogin && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              label="First name"
              placeholder="Sepide"
              icon={<UserRound size={16} />}
              error={errors.first_name?.message}
              {...register("first_name")}
            />

            <FormField
              label="Last name"
              placeholder="Norouzi"
              icon={<UserRound size={16} />}
              error={errors.last_name?.message}
              {...register("last_name")}
            />
          </div>
        )}

        {/* Username */}
        <FormField
          label="Username"
          type="text"
          placeholder="sepide"
          autoComplete="username"
          icon={<UserRound size={16} />}
          error={errors.username?.message}
          {...register("username")}
        />

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="
              mb-2 block
              text-xs font-semibold
              tracking-wide
              text-[var(--text)]
            "
          >
            Password
          </label>

          <div className="relative">
            <LockKeyhole
              size={16}
              className="
                pointer-events-none
                absolute left-4 top-1/2
                -translate-y-1/2
                text-[var(--text-muted)]
              "
            />

            <input
              id="password"
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete={isLogin ? "current-password" : "new-password"}
              aria-invalid={!!errors.password}
              className="
                h-12 w-full
                rounded-xl
                border border-[var(--border)]
                bg-[var(--stone-100)]
                pl-11 pr-12
                text-sm
                text-[var(--text)]
                placeholder:text-[var(--text-muted)]
                outline-none
                transition-all duration-200
                hover:border-[var(--brown-300)]
                focus:border-[var(--gold)]
                focus:bg-[var(--surface)]
                focus:ring-4
                focus:ring-[var(--gold)]/10
              "
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="
                absolute right-3 top-1/2
                flex h-8 w-8
                -translate-y-1/2
                items-center justify-center
                rounded-lg
                text-[var(--text-muted)]
                transition
                hover:bg-[var(--brown-100)]
                hover:text-[var(--text)]
              "
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm password */}
        {!isLogin && (
          <div>
            <label
              htmlFor="password2"
              className="
                mb-2 block
                text-xs font-semibold
                tracking-wide
                text-[var(--text)]
              "
            >
              Confirm password
            </label>

            <div className="relative">
              <LockKeyhole
                size={16}
                className="
                  pointer-events-none
                  absolute left-4 top-1/2
                  -translate-y-1/2
                  text-[var(--text-muted)]
                "
              />

              <input
                id="password2"
                {...register("password2")}
                type={showPassword2 ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                aria-invalid={!!errors.password2}
                className="
                  h-12 w-full
                  rounded-xl
                  border border-[var(--border)]
                  bg-[var(--stone-100)]
                  pl-11 pr-12
                  text-sm
                  text-[var(--text)]
                  placeholder:text-[var(--text-muted)]
                  outline-none
                  transition-all duration-200
                  hover:border-[var(--brown-300)]
                  focus:border-[var(--gold)]
                  focus:bg-[var(--surface)]
                  focus:ring-4
                  focus:ring-[var(--gold)]/10
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword2((prev) => !prev)}
                className="
                  absolute right-3 top-1/2
                  flex h-8 w-8
                  -translate-y-1/2
                  items-center justify-center
                  rounded-lg
                  text-[var(--text-muted)]
                  transition
                  hover:bg-[var(--brown-100)]
                  hover:text-[var(--text)]
                "
                aria-label={
                  showPassword2
                    ? "Hide confirmation password"
                    : "Show confirmation password"
                }
              >
                {showPassword2 ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {errors.password2 && (
              <p className="mt-1.5 text-xs text-red-500">
                {errors.password2.message}
              </p>
            )}
          </div>
        )}

        {/* Messages */}
        {authError && (
          <div
            className="
              rounded-xl
              border border-[var(--orange)]/20
              bg-[var(--orange-light)]
              px-4 py-3
              text-xs leading-relaxed
              text-[var(--orange)]
            "
          >
            {authError}
          </div>
        )}

        {authInfo && (
          <div
            className="
              rounded-xl
              border border-[var(--green)]/20
              bg-[var(--green-light)]
              px-4 py-3
              text-xs leading-relaxed
              text-[var(--green)]
            "
          >
            {authInfo}
          </div>
        )}

        {/* CTA */}
        <button
          type="submit"
          disabled={isPending}
          className="
            group mt-2
            flex w-full
            items-center justify-center gap-2
            rounded-xl
            border border-[var(--gold)]/30
            bg-gradient-to-r
            from-[var(--gold)]
            to-[var(--brown-500)]
            px-5 py-3.5
            text-sm font-bold
            text-[var(--brown-900)]
            shadow-[0_10px_24px_rgba(207,162,71,0.16)]
            transition-all duration-200
            hover:-translate-y-0.5
            hover:shadow-[var(--shadow-gold)]
            active:translate-y-0
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <span>
            {isPending
              ? "Please wait…"
              : isLogin
                ? "Sign In"
                : "Create Account"}
          </span>

          {!isPending && (
            <ArrowRight
              size={16}
              className="
                transition-transform duration-200
                group-hover:translate-x-0.5
              "
            />
          )}
        </button>
      </form>

      {/* Footer */}
      <p
        className="
          mt-6 text-center
          text-[11px]
          leading-relaxed
          text-[var(--text-muted)]
        "
      >
        {isLogin
          ? "New to Readers' Nook?"
          : "Already have a Readers' Nook account?"}{" "}
        <button
          type="button"
          onClick={() => handleModeChange(!isLogin)}
          className="
            font-semibold
            text-[var(--brown-600)]
            underline decoration-[var(--gold)]/40
            underline-offset-4
            transition
            hover:text-[var(--gold)]
          "
        >
          {isLogin ? "Create one" : "Sign in"}
        </button>
      </p>

      <p
        className="
          mt-5 text-center
          text-[10px]
          uppercase
          tracking-[0.14em]
          text-[var(--text-muted)]
        "
      >
        Your reading space, beautifully organized.
      </p>
    </div>
  );
}
