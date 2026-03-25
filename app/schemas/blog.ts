import z from 'zod/v3'

export const blogSchema = z.object({
    title: z.string().min(3).max(100),
    content: z.string().min(10),
    
})