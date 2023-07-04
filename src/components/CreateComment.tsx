"use client";

import { startTransition, useState } from "react";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import { Button } from "./ui/Button";
import { useMutation } from "@tanstack/react-query";
import { CommentCreationRequest } from "../lib/validators/comment";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useRouter } from "next/navigation";

interface CreateCommentProps {
  postId: string;
  replyToId?: string;
}

const CreateComment = ({ postId, replyToId }: CreateCommentProps) => {
  const [input, setInput] = useState<string>("");
  const { loginToast } = useCustomToast();
  const router = useRouter();

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentCreationRequest) => {
      const payload: CommentCreationRequest = {
        postId,
        text,
        replyToId,
      };

      const { data } = await axios.patch(
        "/api/community/post/comment",
        payload
      );
      return data;
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 422) {
          return toast({
            title: "Invalid comment.",
            description: "Comment must be between 3 and 320 characters.",
            variant: "destructive",
          });
        }

        if (err.response?.status === 401) {
          return loginToast();
        }
      }

      toast({
        title: "There was an error.",
        description: "Comment was not post successfully.",
        variant: "destructive",
      });
    },

    onSuccess: () => {
      setInput("");
      startTransition(() => {
        router.refresh();
      });

      toast({
        description: `You have successfully posted a comment`,
      });
    },
  });

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment">Your Comment</Label>
      <div className="mt-2">
        <Textarea
          id="comment"
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="What's your thoughts?"
        />

        <div className="mt-3 flex justify-end">
          <Button
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ postId, text: input, replyToId })}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CreateComment;
