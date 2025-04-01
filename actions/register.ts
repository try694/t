"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  // Validate incoming values against the schema.
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }

  // Destructure the validated data.
  // Note: We do not use confirmPassword in user creation.
  const { firstname, lastname, phone, country, metamask, autotrade, email, password } =
    validatedFields.data;

  // Hash the password.
  const hashedPassword = await bcrypt.hash(password, 10);

  // Check if the email is already in use.
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // Create the new user.
  await db.user.create({
    data: {
      firstname,
      lastname,
      phone,
      country,
      metamask,
      autotrade,
      email, 
      password: hashedPassword,
    },
  });

  // Generates a verification token (assumes generateVerificationToken handles sending email, etc.)
  const verificationToken = await generateVerificationToken(email);

  return { success: "user created!" };
};
