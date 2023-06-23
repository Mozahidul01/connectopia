import TextEditor from "@/components/TextEditor";
import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  return {
    title: `Create Post in c/${params.slug}`,
  };
}

const page = async ({ params }: PageProps) => {
  const community = await db.community.findFirst({
    where: {
      name: params.slug,
    },
  });

  if (!community) throw notFound();

  return (
    <div className="flex flex-col items-start gap-6">
      <div className="border-b border-gray-200 dark:border-gray-700 pb-5">
        <div className="-ml-2 -mt-2 flex flex-wrap items-baseline">
          <h3 className="ml-2 mt-2 text-base font-semibold leading-6 text-gray-800 dark:text-gray-100">
            Create Post
          </h3>
          <p className="ml-2 mt-1 truncate text-sm text-gray-500 dark:text-gray-400">
            in c/{params.slug}
          </p>
        </div>
      </div>

      {/* Text Editor  */}
      <TextEditor communityId={community.id} />

      <div className="w-full flex justify-end">
        <Button
          type="submit"
          className="w-full text-lg"
          form="community-post-form"
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default page;
