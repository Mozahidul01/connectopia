"use client";

import { startTransition, useRef, useState } from "react";
import { UserAvatar } from "../UserAvatar";
import { Comment, CommentVote, User } from "@prisma/client";
import { formatTimeToNow } from "@/lib/utils";
import CommentVotes from "./CommentVotes";
import { Button } from "../ui/Button";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Label } from "../ui/Label";
import { Textarea } from "../ui/Textarea";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { useMutation } from "@tanstack/react-query";
import { CommentCreationRequest } from "@/lib/validators/comment";
import axios, { AxiosError } from "axios";
import { toast } from "@/hooks/use-toast";

type ExtendedComment = Comment & {
  votes: CommentVote[];
  author: User;
};

interface PostCommentProps {
  comment: ExtendedComment;
  votesAmt: number;
  currentVote: CommentVote | undefined;
  postId: string;
}

const PostComment = ({
  comment,
  votesAmt,
  currentVote,
  postId,
}: PostCommentProps) => {
  const commentRef = useRef<HTMLDivElement>(null);
  const [isReplying, setIsReplying] = useState<boolean>(false);
  const [reply, setReply] = useState<string>("");
  const router = useRouter();
  const { data: session } = useSession();
  const { loginToast } = useCustomToast();

  const { mutate: commentReply, isLoading } = useMutation({
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
      setReply("");
      setIsReplying(false);
      startTransition(() => {
        router.refresh();
      });

      toast({
        description: `You have successfully posted a comment`,
      });
    },
  });

  return (
    <div
      ref={commentRef}
      className="flex flex-col "
    >
      <div className="flex items-center">
        <UserAvatar
          className="w-6 h-6"
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
        />

        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
            u/{comment.author.username}
          </p>
          <p className="max-h-40 truncate text-xs text-gray-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="mt-2 text-sm text-zinc-900 dark:text-zinc-100">
        {comment.text}
      </p>

      <div className="flex gap-4 items-center">
        <CommentVotes
          commentId={comment.id}
          initialVotesAmt={votesAmt}
          initialVote={currentVote}
        />

        <Button
          onClick={() => {
            if (!session) {
              return router.push("/sign-in");
            }
            setIsReplying(true);
          }}
          variant="ghost"
          size="xs"
          aria-label="reply"
        >
          <MessageSquare className="mr-1.5 h-5 w-5" />
          <span>Reply</span>
        </Button>
      </div>

      {isReplying && (
        <div className="grid w-full gap-1.5 mt-2">
          <Label htmlFor="comment">Your Comment</Label>
          <div className="mt-2">
            <Textarea
              id="comment"
              rows={1}
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              placeholder="What's your thoughts?"
            />

            <div className="mt-3 flex justify-end gap-3">
              <Button
                tabIndex={-1}
                variant="subtle"
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
              <Button
                isLoading={isLoading}
                disabled={reply.length === 0}
                onClick={() =>
                  commentReply({
                    postId,
                    text: reply,
                    replyToId: comment.replyToId ?? comment.id,
                  })
                }
              >
                Post
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostComment;
