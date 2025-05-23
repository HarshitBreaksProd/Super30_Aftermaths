"use client"; // Client Session Example
import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  return (
    <SessionProvider>
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <ProtectedComp />
      </div>
    </SessionProvider>
  );
}

function ProtectedComp() {
  const session = useSession();

  if (session.status === "authenticated") {
    return (
      <>
        <button onClick={() => signOut()} className="p-2 border text-white">
          Logout
        </button>
      </>
    );
  } else {
    return (
      <button onClick={() => signIn()} className="p-2 border text-white">
        Log in
      </button>
    );
  }
}
