import { z } from "zod";

export const PostValidator = z.object({
  title: z
    .string()
    .min(4, { message: "Title must be Longer than 4 characters" })
    .max(128, { message: "Title must be Least 128 characters" }),
  communityId: z.string(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
