import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./betterAuth/auth";

// Create a new task with the given text
export const createPost = mutation({
  args: { title: v.string(), body: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
        throw new Error("User not authenticated");
    }
    const blogArticle = await ctx.db.insert("posts", {
        body: args.body,
        title: args.title,
        authorId: user._id
    });
    return blogArticle;
  },
});