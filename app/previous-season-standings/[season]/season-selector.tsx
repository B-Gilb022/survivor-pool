"use client";

import { useRouter } from "next/navigation";

type Props = {
    seasons: number[];
    currentSeason: number;
};

export default function SeasonSelector({ seasons, currentSeason }: Props) {
    const router = useRouter();

    return (
        <label className="block mb-4 fixed top-6 left-1/2 -translate-x-1/2 z-50">
            <span className="mr-2 font-medium text-lg">Season:</span>
            <select className="bg-gray-700 text-white border rounded-lg px-6 py-3 text-lg"
                value={currentSeason}
                onChange={(e) => {
                    router.push(`/previous-season-standings/${e.target.value}`);
                }}
                //className="border rounded px-2 py-1"
            >
                {seasons.map((season) => (
                    <option key={season} value={season}>
                        Season {season}
                    </option>
                ))}
            </select>
        </label>
    );
}