"use server";

import * as z from "zod";
import bcrypt from "bcrypt"
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user"

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  
  const{ firstname, lastname, phone, country, metamask, email, password  } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10);
   
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!"}
  }

  await db.user.create({
    data: {
      firstname,
      lastname,
      phone,
      country,
      metamask,
      email,
      password: hashedPassword
    }
  })

  return { success: "User created!" };
};
