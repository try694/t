import * as z from "zod";
import { isValidPhoneNumber } from "libphonenumber-js";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required"
  }),
  password: z.string().min(1, {
    message: "password is required"
  })
})

export const RegisterSchema = z.object({
  firstname: z.string().min(1, {
    message: "firstname is required"
  }),
  lastname: z.string().min(1, {
    message: "lastname is required"
  }),
  phone: z.string().refine(isValidPhoneNumber, {
     message: "Phone not valid" 
    }),
  country: z.string().min(1, { 
    message: "Country is required" 
  }),
  metamask: z.string().min(1, 
    { message: "metamask acc address required"
     }),
  email: z.string().email({
    message: "email is required"
  }),
  password: z.string().min(6, {
    message: "minimum 6 character is required"
  })
})