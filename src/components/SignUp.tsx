import { Icons } from "@/components/Icons";
import UserAuthForm from "@/components/UserAuthForm";
import Link from "next/link";

const SignUp = () => {
  return (
    <div className="container mx-auto py-8 rounded-md flex w-full flex-col justify-center space-y-6 sm:w-[400px] shadow-md bg-gray-100 dark:bg-slate-800">
      <div className="flex flex-col text-center space-y-6">
        <Icons.logo className="mx-auto h-11 w-11" />
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-50">
          Sign Up{" "}
        </h1>
        <p className="text-sm max-w-xs mx-auto text-gray-600 dark:text-gray-400">
          By continuing, you are setting up a Breadit account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>

      <UserAuthForm />

      <p className="px-8 text-center text-sm text-muted-foreground text-gray-600 dark:text-gray-400">
        Already have a account?{" "}
        <Link
          href="/sign-in"
          className="hover:text-brand text-sm underline underline-offset-4 text-gray-800 dark:text-gray-100"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default SignUp;
