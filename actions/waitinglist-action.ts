"use server";

import * as z from "zod";

import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { EditApprovedUserSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export const getAllUsers = async () => {
  try {
    const users = await db.user.findMany({
      where: { approved: false },
      orderBy: { createdAt: "desc" },
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const getApprovedUsers = async () => {
  try {
    const users = await db.user.findMany({
      where: { approved: true },
      orderBy: { createdAt: "desc" },
    });
    // Normalize whitelisted field
    return users.map(user => ({
      ...user,
      whitelisted: user.whitelisted ?? false,
    }));
  } catch (error) {
    console.error("Error fetching approved users:", error);
    return [];
  }
};

export const updateApprovedUser = async (
  userId: string,
  values: z.infer<typeof EditApprovedUserSchema>
) => {
  // Validate input
  const parsed = EditApprovedUserSchema.safeParse(values);
  if (!parsed.success) {
    const errorMessages = parsed.error.errors
      .map((err) => err.message)
      .join(", ");
    return { error: errorMessages || "Invalid fields!" };
  }

  // Destructure the validated data
  const {
    firstname,
    lastname,
    phone,
    country,
    metamask,
    autotrade,
    email,
    approved,
    whitelisted,
    groupId,
    allowedTradingAmountFrom,
    allowedTradingAmountTo,
    adminFee,
    userProfit,
    introducerFee,
  } = parsed.data;

  // Check if user exists
  const existingUser = await getUserById(userId);
  if (!existingUser) {
    return { error: "User not found" };
  }

  try {
    const updatedUser = await db.user.update({
      where: { id: userId },
      data: {
        firstname,
        lastname,
        phone,
        country,
        metamask,
        autotrade,
        email,
        approved,
        whitelisted,
        groupId,
        allowedTradingAmountFrom,
        allowedTradingAmountTo,
        adminFee,
        userProfit,
        introducerFee,
      },
    });
    // Revalidate the approved users route (adjust the path as needed)
    revalidatePath("/approveduser");
    return { success: "User updated successfully!", user: updatedUser };
  } catch (error) {
    console.error("Error updating user:", error);
    return { error: "Error updating user" };
  }
};
