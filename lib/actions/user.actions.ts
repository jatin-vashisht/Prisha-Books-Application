"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/utils/db";
import { updateParams } from "@/types";

export async function fetchUser(email: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { email: email },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        bio: true,
        image: true,
        onboarded: true,
        books: true,
      },
    });
    return user
  } catch (error: any) {
    throw new Error(`Failed to fetch user: ${error.message}`);
  }
}

export async function updateUser({
  userId,
  bio,
  name,
  email,
  path,
  username,
  image,
}: updateParams): Promise<void> {
  try {

    await prisma.user.upsert({
      where: { id: userId },
      update: {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true,
      },
      create: {
        id: userId,
        username: username.toLowerCase(),
        name,
        email,
        bio,
        image,
        onboarded: true,
      },
    })
  } catch (error: any) {
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
}
