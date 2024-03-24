"use server";

import { z } from "zod";
import { authOptions } from "./auth";
import { getServerSession } from "next-auth";
import { db } from "./db";
import { users, usersToSkills } from "./schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { NewUserToSkill } from "./types";

const UpdateUserSchema = z.object({
  jobTitle: z.string().min(3),
  bio: z.string(),
});

export interface UpdateUserState {
  errors?: {
    jobTitle?: string[];
    bio?: string[];
  };
  message?: string;
  success?: string;
}

export async function updateUser(
  prevState: UpdateUserState,
  formData: FormData
): Promise<UpdateUserState> {
  const session = await getServerSession(authOptions);
  const jobTitle = formData.get("jobTitle");
  const bio = formData.get("bio");

  const validatedFields = UpdateUserSchema.safeParse({
    jobTitle: jobTitle,
    bio: bio,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Update user error",
    };
  }

  await db
    .update(users)
    .set({
      jobTitle: validatedFields.data.jobTitle,
      bio: validatedFields.data.bio,
    })
    .where(eq(users.id, session?.user.id));

  return {
    success: "Update user success",
  };
}