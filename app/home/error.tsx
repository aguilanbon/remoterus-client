"use client"; // Error components must be Client Components

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center text-center">
      <h2 className="text-2xl mb-4 text-green-300">There was a problem!</h2>
      <h1 className="text-6xl mb-6 text-white font-bold">{error.message}</h1>
      <p className="text-xl mb-16 text-slate-500 font-bold">
        Invalid access token! Please try signing in again.
      </p>
      {/* <Button
        variant={"outline"}
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => router.replace("/")
        }
      >
        Go back to sign in page
      </Button> */}
      <Link
        className="border-2 bg-white rounded-md py-2 px-4 text-sm hover:bg-slate-200 duration-150 transition-colors"
        href={"/"}
      >
        Go back to Sign in Page
      </Link>
    </div>
  );
}
