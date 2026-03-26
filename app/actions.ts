"use server";

import z from "zod/v3";
import { blogSchema } from "./schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export const createBlogAction = async (values: z.infer<typeof blogSchema>) => {
  
  try {
    const parsed = blogSchema.safeParse(values);
    if (!parsed.success) {
      throw new Error("Failed to parse data");
    }

    const token = await getToken();
    if (!token) {
      throw new Error("Unauthorized");
    }
    const uploadUrl = await fetchMutation(api.posts.generateImage, {}, {token});

    const res = await fetch(uploadUrl, {
      method: "POST",
      body: parsed.data.image,
      headers: {
        "Content-type": parsed.data.image.type
      }
    });

    const data = await res.json();
    

    if (!res.ok){
      return {
        error: "Failed to upload images"
      }
    }

    const {storageId} = data;

    await fetchMutation(api.posts.createPost, {
    title: parsed.data.title,
    body: parsed.data.content,
    imageStorageId: storageId
  }, {token});
    
    
  } catch (error) {
    console.log(error);
    
  }
  


  return redirect("/")
};