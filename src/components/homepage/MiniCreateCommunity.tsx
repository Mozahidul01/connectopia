import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "../ui/Button";

const MiniCreateCommunity = () => {
  return (
    <div className="overflow-hidden h-fit rounded-lg border order-first md:order-last shadow-sm bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-gray-700">
      <div className="bg-emerald-100 dark:bg-emerald-500 px-6 py-4">
        <p className="font-semibold py-3 flex items-center gap-1.5 text-gray-900">
          <HomeIcon className="w-4 h-4" />
          Home
        </p>
      </div>
      <div className="-my-3 divide-y divide-gray-100 px-6 py-4 text-sm leading-6">
        <div className="flex justify-between gap-x-4 py-3">
          <p className="text-slate-500 dark:text-gray-400">
            Your personal Connectopia homepage. come here to check in with your
            favorite communities.
          </p>
        </div>

        <Link
          className={buttonVariants({
            className: "w-full mt-4 mb-6",
          })}
          href="/c/create"
        >
          Create Community
        </Link>
      </div>
    </div>
  );
};

export default MiniCreateCommunity;
