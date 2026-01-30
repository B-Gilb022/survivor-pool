"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-wide">
          Survivor Pool Webpage
        </h1>
        <br>
        </br>
        <button
          onClick={() => router.push("/standings")}
          className="px-8 py-3 text-lg font-semibold bg-green-500 hover:bg-green-600 rounded-lg transition"
        >
          View Standings
        </button>
      </div>
    </main>
  );
}
