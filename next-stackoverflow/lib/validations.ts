import * as z from "zod"

export const questionFormSchema = z.object({
  title: z.string().min(5, {
    message: "Username must be at least 5 characters.",
  }),
})
