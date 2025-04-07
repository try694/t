"use server";

import * as z from "zod";
import bcrypt from "bcrypt";
import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

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

  // Create the new user with initial default values for admin-approval fields.
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
      approved: false,                  // New user is not approved yet
      whitelisted: false,               // Default false
      groupId: "",                      // Empty string
      allowedTradingAmountFrom: 0,      // 0 by default
      allowedTradingAmountTo: 0,
      adminFee: 0,
      userProfit: 0,
      introducerFee: 0,
    },
  });

  // Generate a verification token and send verification email.
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(
    verificationToken.email,
    verificationToken.token,
  );
  
  return { success: "Confirmation email sent!" };
};
