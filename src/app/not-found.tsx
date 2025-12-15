"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#121212] text-white p-8">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">
        Looks like you tried to do something… but nothing exists here.
      </p>
      <Link href="/">
        <button className="px-6 py-3 bg-white text-black rounded-md hover:bg-gray-200 transition">
          Return to Doing Nothing
        </button>
      </Link>
    </main>
  );
}
