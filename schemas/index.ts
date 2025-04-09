import * as z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";


export const EditApprovedUserSchema = z.object({
  firstname: z.string().min(1, { message: "Firstname is required" }),
  lastname: z.string().min(1, { message: "Lastname is required" }),
  phone: z.string().min(1, { message: "Phone is required" }),
  country: z.string().min(1, { message: "Country is required" }),
  metamask: z.string().min(1, { message: "Metamask address required" }),
  autotrade: z.string().min(1, { message: "Autotrade info required" }),
  email: z.string().email({ message: "Invalid email" }),
  approved: z.boolean(),
  whitelisted: z.boolean(),
  groupId: z.string(),
  
  // Allow either a numeric value or the literal "Unlimited"
  allowedTradingAmountFrom: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Minimum amount must be 0 or more" })
  ),
  allowedTradingAmountTo: z.preprocess((val) => {
    if (typeof val === "string" && val.trim().toLowerCase() === "unlimited") {
      return "Unlimited";
    }
    return Number(val);
  }, z.union([
    z.number().min(0, { message: "Maximum amount must be 0 or more" }),
    z.literal("Unlimited")
  ])),
  adminFee: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Admin fee must be 0 or more" })
  ),
  userProfit: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "User profit must be 0 or more" })
  ),
  introducerFee: z.preprocess(
    (val) => Number(val),
    z.number().min(0, { message: "Introducer fee must be 0 or more" })
  ),
});


// Schema for the admin popup approval form
export const ApproveUserPopupSchema = z.object({
  groupId: z.string().min(1, { message: "Group is required" }),
  whitelisted: z.boolean(),
  allowedTradingAmountFrom: z.preprocess(
    (a) => Number(a),
    z.number().min(0, { message: "Minimum trading amount must be 0 or more" })
  ),
  allowedTradingAmountTo: z.preprocess(
    (a) => {
      if (typeof a === "string" && a.trim().toLowerCase() === "unlimited") {
        return "Unlimited";
      }
      return Number(a);
    },
    z.union([
      z.number().min(0, { message: "Maximum trading amount must be 0 or more" }),
      z.literal("Unlimited"),
    ])
  ),
  adminFee: z.preprocess(
    (a) => Number(a),
    z.number().min(0, { message: "Admin fee must be 0 or more" })
  ),
  userProfit: z.preprocess(
    (a) => Number(a),
    z.number().min(0, { message: "User profit must be 0 or more" })
  ),
  introducerFee: z.preprocess(
    (a) => Number(a),
    z.number().min(0, { message: "Introducer fee must be 0 or more" })
  ),
});


export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
   message: "Minumum of 6 characters required"}),
});

export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required"}),
});

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
