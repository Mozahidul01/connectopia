"use client";

import Link from "next/link";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { LogOut, Rss, Settings, Users2 } from "lucide-react";
import { UserAvatar } from "@/components/UserAvatar";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">;
}

export function UserAccountNav({ user }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8 rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="bg-white dark:bg-slate-800 dark:border-slate-700 dark:text-slate-50 "
        align="end"
      >
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && (
              <p className="font-medium dark:text-white">{user.name}</p>
            )}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground dark:text-gray-300">
                {user.email}
              </p>
            )}
          </div>
        </div>
        <DropdownMenuSeparator className="dark:bg-slate-700" />
        <DropdownMenuItem
          asChild
          className="dark:hover:bg-slate-950 dark:hover:text-white"
        >
          <Link href="/">
            <Rss className="mr-2 h-4 w-4" />
            <span>Feed</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="dark:hover:bg-slate-950 dark:hover:text-white"
        >
          <Link href="/c/create">
            <Users2 className="mr-2 h-4 w-4" />
            <span>Create Community</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          asChild
          className="dark:hover:bg-slate-950 dark:hover:text-white"
        >
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="dark:bg-slate-700" />

        <DropdownMenuItem
          onSelect={(e: { preventDefault: () => void }) => {
            e.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="group cursor-pointer dark:hover:bg-slate-950 dark:hover:text-white "
        >
          <LogOut className="mr-2 h-4 w-4 group-hover:text-red-500" />
          <span className="group-hover:text-red-500">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
