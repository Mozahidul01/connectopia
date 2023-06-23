"use client";

import { Session } from "next-auth";
import { usePathname, useRouter } from "next/navigation";
import { FC } from "react";
import { UserAvatar } from "./UserAvatar";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { ImageIcon, Link2 } from "lucide-react";

interface MiniCreatePostProps {
  session: Session | null;
}

const MiniCreatePost: FC<MiniCreatePostProps> = ({ session }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <li className="overflow-hidden rounded-md bg-white dark:bg-gray-900 shadow list-none">
      <div className="h-full px-6 py-4 flex justify-between gap-6">
        <div className="relative">
          <UserAvatar
            user={{
              name: session?.user.name || null,
              image: session?.user.image || null,
            }}
          />

          <span className="absolute bottom-0 right-0 rounded-full w-3 h-3 bg-emerald-500 outline outline-2 outline-white" />
        </div>

        <Input
          readOnly
          className="dark:border-gray-700"
          onClick={() => router.push(pathname + "/create-post")}
          placeholder="Create a Post..."
        />

        <Button
          variant="subtle"
          onClick={() => router.push(pathname + "/create-post")}
        >
          <ImageIcon className="text-slate-600 dark:text-gray-400" />
        </Button>

        <Button
          variant="subtle"
          onClick={() => router.push(pathname + "/create-post")}
        >
          <Link2 className="text-slate-600 dark:text-gray-400" />
        </Button>
      </div>
    </li>
  );
};

export default MiniCreatePost;
