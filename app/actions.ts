"use server";

import z from "zod/v3";
import { blogSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export const createBlogAction = async (values: z.infer<typeof blogSchema>) => {
  const parsed = blogSchema.safeParse(values);
  if (!parsed.success) {
    throw new Error("Failed to parse data");
  }

  const token = await getToken();
  if (!token) {
    throw new Error("Unauthorized");
  }
  await fetchMutation(api.posts.createPost, {
    title: parsed.data.title,
    body: parsed.data.content,
  }, {token});


  return redirect("/")
};