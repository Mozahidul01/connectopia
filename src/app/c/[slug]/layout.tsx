import type { Metadata } from "next";
import Link from "next/link";
import { format } from "date-fns";
import SubscribeLeaveToggle from "@/components/SubscribeLeaveToggle";
import { buttonVariants } from "@/components/ui/Button";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { cn } from "@/lib/utils";
import { ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Community",
  description: "Community page of Connectopia.",
};

const Layout = async ({
  children,
  params: { slug },
}: {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}) => {
  const session = await getAuthSession();

  const community = await db.community.findFirst({
    where: { name: slug },
    include: {
      posts: {
        include: {
          author: true,
          votes: true,
        },
      },
    },
  });

  const subscription = !session?.user
    ? undefined
    : await db.subscription.findFirst({
        where: {
          Community: {
            name: slug,
          },
          user: {
            id: session.user.id,
          },
        },
      });

  const isSubscribed = !!subscription;

  const memberOfCommunity = await db.subscription.count({
    where: {
      Community: {
        name: slug,
      },
    },
  });

  const formattedCreatedAt = community?.createdAt
    ? format(community.createdAt, "MMM d, yyyy")
    : "";

  return (
    <div className="sm:container max-w-7xl mx-auto h-full">
      <div className="my-2">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "self-start -mt-20"
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-4 md:gap-x-4 py-6">
          <div className="flex flex-col col-span-2 space-y-6">{children}</div>

          {/* info sidebar */}
          <div className="hidden md:block overflow-hidden h-fit rounded-lg border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100 order-first md:order-last">
            <div className="px-6 py-4">
              <p className="font-semibold py-3 text-gray-900 dark:text-gray-100">
                About c/{community?.name}
              </p>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-700 px-6 py-4 text-sm leading-6 bg-white dark:bg-gray-800">
              <div className="flex justify-between gap-x-4 py-3">
                <div className="text-gray-500 dark:text-gray-200">Created</div>
                <div className="text-gray-700 dark:text-gray-300">
                  <time dateTime={community?.createdAt.toDateString()}>
                    {formattedCreatedAt}
                  </time>
                </div>
              </div>

              <div className="flex justify-between gap-x-4 py-3">
                <div className="text-gray-500 dark:text-gray-200">Members</div>
                <div className="text-gray-700 dark:text-gray-300">
                  <div className="text-gray-900 dark:text-gray-100">
                    {memberOfCommunity}
                  </div>
                </div>
              </div>

              {community?.creatorId === session?.user?.id && (
                <div className="flex justify-between gap-x-4 py-3">
                  <p className="text-gray-500 dark:text-gray-200">
                    You have created this community
                  </p>
                </div>
              )}

              {community?.creatorId !== session?.user?.id && (
                <SubscribeLeaveToggle
                  isSubscribed={isSubscribed}
                  communityId={community?.id ?? ""}
                  communityName={community?.name ?? ""}
                />
              )}

              {isSubscribed && (
                <Link
                  className={buttonVariants({
                    variant: "outline",
                    className: "w-full mb-6",
                  })}
                  href={`/c/${slug}/create-post`}
                >
                  Create Post
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
