import CommentSection from "@/components/CommentSection";
import EditorOutput from "@/components/EditorOutput";
import PostVoteServer from "@/components/post-vote/PostVoteServer";
import { buttonVariants } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { redis } from "@/lib/redis";
import { formatTimeToNow } from "@/lib/utils";
import { CachedPost } from "@/types/redis";
import { Post, User, Vote } from "@prisma/client";
import {
  ArrowBigDown,
  ArrowBigUp,
  Loader2,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

interface PageProps {
  params: {
    postId: string;
  };
}

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const page = async ({ params }: PageProps) => {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost;

  let post: (Post & { votes: Vote[]; author: User }) | null = null;

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    });
  }

  if (!post && !cachedPost) return notFound();

  return (
    <div>
      <div className="h-full flex flex-col sm:flex-row items-start justify-between">
        <Suspense fallback={<PostVoteShell />}>
          <PostVoteServer
            postPage={true}
            postId={post?.id ?? cachedPost.id}
            getData={async () => {
              return await db.post.findUnique({
                where: {
                  id: params.postId,
                },
                include: {
                  votes: true,
                },
              });
            }}
          />
        </Suspense>

        <div className="sm:w-0 w-full flex-1 p-4 rounded-sm bg-white dark:bg-gray-900">
          <p className="max-h-40 mt-1 truncate text-xs text-gray-500 dark:text-gray-400">
            Posted by u/{post?.author.username ?? cachedPost.authorUsername}
            {" • "}
            {formatTimeToNow(new Date(post?.createdAt ?? cachedPost.createdAt))}
          </p>
          <h1 className="text-lg font-semibold py-2 leading-6 text-gray-900 dark:text-gray-50">
            {post?.title ?? cachedPost.title}
          </h1>

          <EditorOutput content={post?.content ?? cachedPost.content} />

          <Suspense
            fallback={
              <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
            }
          >
            <CommentSection postId={post?.id ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

function PostVoteShell() {
  return (
    <div className="flex flex-col pr-4 sm:w-20 gap-4 justify-start items-center">
      <div className={buttonVariants({ variant: "ghost" })}>
        <ThumbsUpIcon className="h-6 w-6" />
      </div>

      <div className="text-center py-2 font-medium text-sm text-gray-900 dark:text-gray-50">
        <Loader2 className="h-4 w-4 animate-spin" />
      </div>

      <div className={buttonVariants({ variant: "ghost" })}>
        <ThumbsDownIcon className="h-6 w-6" />
      </div>
    </div>
  );
}

export default page;
