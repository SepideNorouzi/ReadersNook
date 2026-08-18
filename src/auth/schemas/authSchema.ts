import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

export const signupSchema = z
  .object({
    first_name: z.string().min(1, "First name is required."),
    last_name: z.string().min(1, "Last name is required."),
    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(20, "Username is too long."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    password2: z.string().min(8, "Please confirm your password."),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match.",
    path: ["password2"], // attaches the error to the confirm field, not the whole form
  });

export type LoginForm = z.infer<typeof loginSchema>;
export type SignupForm = z.infer<typeof signupSchema>;
