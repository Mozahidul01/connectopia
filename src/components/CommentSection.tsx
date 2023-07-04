import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import PostComment from "./PostComment";
import CreateComment from "./CreateComment";

interface CommentSectionProps {
  postId: string;
}

const CommentSection = async ({ postId }: CommentSectionProps) => {
  const session = await getAuthSession();
  const comments = await db.comment.findMany({
    where: {
      postId: postId,
      replyTo: null,
    },
    include: {
      author: true,
      votes: true,
      replies: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });
  return (
    <div className="flex flex-col gap-y-4 mt-4">
      <hr className="w-full h-px my-6" />

      <CreateComment postId={postId} />

      <div className="flex flex-col gap-y-6 mt-4">
        {comments
          .filter((comment) => !comment.replyToId)
          .sort((a, b) => a.votes.length - b.votes.length)
          .map((topComment) => {
            const topCommentVoteAmt = topComment.votes.reduce((acc, vote) => {
              if (vote.type === "UP") return acc + 1;
              if (vote.type === "DOWN") return acc - 1;
              return acc;
            }, 0);

            const topCommentVote = topComment.votes.find(
              (vote) => vote.userId === session?.user.id
            );

            return (
              <div
                key={topComment.id}
                className="flex flex-col"
              >
                <div className="mb-2">
                  <PostComment
                    comment={topComment}
                    votesAmt={topCommentVoteAmt}
                    currentVote={topCommentVote}
                    postId={postId}
                  />
                </div>

                {topComment.replies
                  .sort((a, b) => b.votes.length - a.votes.length)
                  .map((reply) => {
                    const replyVoteAmt = reply.votes.reduce((acc, vote) => {
                      if (vote.type === "UP") return acc + 1;
                      if (vote.type === "DOWN") return acc - 1;
                      return acc;
                    }, 0);

                    const replyVote = reply.votes.find(
                      (vote) => vote.userId === session?.user.id
                    );
                    return (
                      <div
                        key={reply.id}
                        className="ml-2 py-2 pl-4 border-l-2 border-gray-200 dark:border-slate-800"
                      >
                        <PostComment
                          comment={reply}
                          votesAmt={replyVoteAmt}
                          currentVote={replyVote}
                          postId={postId}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CommentSection;
