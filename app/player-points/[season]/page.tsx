import Link from "next/link";
import BackButton from "@/app/components/BackButton";

type PlayerPoint = {
    PlayerId: number;
    PlayerName: string;
    RemainInTheGamePts: number;
    FoundAdvantagePts: number;
    UsedAdvantagePts: number;
    ShotInTheDarkPts: number;
    IndividualRewardPts: number;
    ConfessionalPts: number;
    IndividualImmunityPts: number;
    TribalImmunityPts: number;
    TribalRewardPts: number;
    TotalPoints: number;
    Eliminated: boolean;
};

export default async function PlayerPointsPage({ params }: { params: Promise<{ season: string }> }) {
    const { season } = await params;
    const seasonNumber = Number(season);

    const res = await fetch(`http://localhost:3000/api/player-points-get/${seasonNumber}`, { cache: "no-store" });
    const playerPoints: PlayerPoint[] = await res.json();
    
    return (
        <div className="min-h-screen min-w-[1500px] bg-gray-800 text-white p-8">
            <BackButton />
            
            <h1 className="mb-6 text-3xl font-bold items-center justify-center text-center">
                Player Points Breakdown - Season {seasonNumber}
            </h1>

            <table className="min-w-full border-collapse border border-gray-800 text-lg ">
                <thead>
                    <tr className="bg-gray-600">
                        <th className="border border-gray-300 px-4 py-2">Player Name</th>
                        <th className="border border-gray-300 px-4 py-2">Remain in Game Points</th>
                        <th className="border border-gray-300 px-4 py-2">Found Advantage Points</th>
                        <th className="border border-gray-300 px-4 py-2">Used Advantage Points</th>
                        <th className="border border-gray-300 px-4 py-2">Shot in the Dark Points</th>
                        <th className="border border-gray-300 px-4 py-2">Individual Reward Points</th>
                        <th className="border border-gray-300 px-4 py-2">Confessional Points</th>
                        <th className="border border-gray-300 px-4 py-2">Individual Immunity Points</th>
                        <th className="border border-gray-300 px-4 py-2">Tribal Immunity Points</th>
                        <th className="border border-gray-300 px-4 py-2">Tribal Reward Points</th>
                        <th className="border border-gray-300 px-4 py-2">Total Points</th>
                    </tr>
                </thead>
                <tbody>
                    {playerPoints.map((player) => (
                        <tr key={player.PlayerId} className={`border-b border-gray-300 ${player.Eliminated ? 'bg-red-600/60' : ''}`}>
                            <td className="border border-gray-300 px-4 py-2">{player.PlayerName}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.RemainInTheGamePts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.FoundAdvantagePts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.UsedAdvantagePts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.ShotInTheDarkPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.IndividualRewardPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.ConfessionalPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.IndividualImmunityPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.TribalImmunityPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.TribalRewardPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.TotalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}   