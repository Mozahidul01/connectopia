import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/Toaster";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Connectopia",
  description: "A social media platform built with Next.js and TypeScript.",
};

export default function RootLayout({
  children,
  authModal,
}: {
  children: React.ReactNode;
  authModal: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "antialiased dark:bg-gray-900 dark:text-white",
        poppins.className
      )}
    >
      <body className="min-h-screen pt-12 bg-slate-50 dark:bg-gray-950 antialiased">
        <Providers>
          <Navbar />

          {authModal}

          <div className="container max-w-7xl mx-auto h-full pt-12 text-gray-900 dark:text-gray-100">
            {children}
          </div>

          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
