import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { Icons } from "./Icons";
import { buttonVariants } from "./ui/Button";
import { UserAccountNav } from "./UserAccountNav";
import ThemeSwitch from "@/hooks/use-theme";
import SearchBar from "./SearchBar";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="fixed top-0 inset-x-0 h-fit bg-gray-100 border-b border-gray-300 z-10 py-2 dark:bg-gray-900 dark:border-gray-800 ">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2">
        {/* logo */}
        <Link
          href="/"
          className="flex gap-2 items-center"
        >
          <Icons.logo className="h-10 w-10 sm:h-8 sm:w-8" />
          <p className="hidden text-2xl font-semibold md:block text-gray-800 dark:text-gray-100">
            Connectopia
          </p>
        </Link>

        <SearchBar />

        <div className="flex gap-4 items-center">
          <ThemeSwitch />
          {session?.user ? (
            <UserAccountNav user={session.user} />
          ) : (
            <Link
              href="/sign-in"
              className={buttonVariants()}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
