"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
    const router = useRouter();

    return (
        <button
            onClick={() => router.back()}
            className="absolute top-4 left-4 text-gray-300 hover:text-white transition-colors duration-300"
        >
            &larr; Back
        </button>
    );
}