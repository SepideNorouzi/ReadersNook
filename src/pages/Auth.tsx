import AuthBrandPanel from "../auth/components/AuthBrandPanel";
import AuthForm from "../auth/components/AuthForm";
import { useAuthForm } from "../auth/hooks/useAuthForm";

export default function Auth() {
  const {
    isLogin,
    isPending,
    authError,
    authInfo,
    errors,
    register,
    handleSubmit,
    onSubmit,
    switchMode,
  } = useAuthForm();

  return (
    <main
      className="
        relative min-h-screen overflow-hidden
        bg-[var(--bg)]
        px-4 py-6
        sm:px-6
        lg:px-8
      "
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -top-36 left-1/2
          h-[28rem] w-[28rem]
          -translate-x-1/2
          rounded-full
          bg-[var(--gold)]/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -bottom-40 -left-32
          h-[24rem] w-[24rem]
          rounded-full
          bg-[var(--orange)]/8
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          top-1/3 -right-32
          h-[22rem] w-[22rem]
          rounded-full
          bg-[var(--brown-400)]/8
          blur-3xl
        "
      />

      <section
        className="
          relative mx-auto
          flex min-h-[calc(100vh-3rem)]
          w-full max-w-5xl
          overflow-hidden
          rounded-[30px]
          border border-[var(--brown-200)]
          bg-[var(--surface)]
          shadow-[var(--shadow-premium)]
        "
      >
        <AuthBrandPanel />

        <div
          className="
            flex w-full flex-1
            items-center justify-center
            bg-gradient-to-br
            from-[var(--surface)]
            via-[var(--surface)]
            to-[var(--brown-50)]
            px-5 py-8
            sm:px-10
            lg:px-14
          "
        >
          <AuthForm
            isLogin={isLogin}
            isPending={isPending}
            authError={authError}
            authInfo={authInfo}
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            switchMode={switchMode}
          />
        </div>
      </section>
    </main>
  );
}