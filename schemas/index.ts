import * as z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const LoginSchema = z.object({
  email: z.string().email({ message: "email is required" }),
  password: z.string().min(1, { message: "password is required" }),
});

export const RegisterSchema = z
  .object({
    firstname: z.string().min(1, { message: "firstname is required" }),
    lastname: z.string().min(1, { message: "lastname is required" }),
    phone: z.string().refine(isValidPhoneNumber, { message: "Phone not valid" }),
    country: z.string().min(1, { message: "Country is required" }),
    metamask: z.string().min(1, { message: "metamask acc address required" }),
    autotrade: z.string().min(1, {message: "BrainStorm username required"}),
    email: z.string().email({ message: "email is required" }),
    password: z.string().min(6, { message: "minimum 6 characters is required" }),
    confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
