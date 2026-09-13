import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, signupSchema } from "../schemas/authSchema";
import { useAuth } from "./useAuth";
import { useModeStore } from "../../store/modeStore";

export type AuthFormValues = {
  first_name?: string;
  last_name?: string;
  username: string;
  password: string;
  password2?: string;
};

export function useAuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [authError, setAuthError] = useState("");
  const [authInfo, setAuthInfo] = useState("");

  const { adminLogin, adminRegister } = useAuth();
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

  const isPending = adminLogin.isPending || adminRegister.isPending;

  async function onSubmit(data: AuthFormValues) {
    setAuthError("");
    setAuthInfo("");

    try {
      if (isLogin) {
        await adminLogin.mutateAsync({
          username: data.username,
          password: data.password,
        });

        setMode("admin");
        reset();
        navigate("/dashboard");
        return;
      }

      await adminRegister.mutateAsync({
        first_name: data.first_name!,
        last_name: data.last_name!,
        username: data.username,
        password: data.password,
        password2: data.password2!,
      });

      setAuthInfo("Account created. You can sign in now.");
      setIsLogin(true);
      reset();
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setAuthError(message);
    }
  }

  function switchMode(login: boolean) {
    setIsLogin(login);
    setAuthError("");
    setAuthInfo("");
    reset();
  }

  return {
    isLogin,
    isPending,
    authError,
    authInfo,
    register,
    handleSubmit,
    errors,
    onSubmit,
    switchMode,
  };
}
