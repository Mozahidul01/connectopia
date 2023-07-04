import { z } from "zod";

export const CommentValidator = z.object({
  postId: z.string(),
  text: z
    .string()
    .min(4, { message: "Comment must be Longer than 4 characters" })
    .max(320, { message: "Comment must be Least 320 characters" }),
  replyToId: z.string().optional(),
});

export type CommentCreationRequest = z.infer<typeof CommentValidator>;
