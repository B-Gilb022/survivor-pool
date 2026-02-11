import Link from "next/link";
import BackButton from "@/app/components/BackButton";

type PlayerPoint = {
    playerId: number;
    playerName: string;
    remainInTheGamePts: number;
    foundAdvantagePts: number;
    usedAdvantagePts: number;
    shotInTheDarkPts: number;
    individualRewardPts: number;
    confessionalPts: number;
    individualImmunityPts: number;
    tribalImmunityPts: number;
    tribalRewardPts: number;
    totalPoints: number;
    eliminated: boolean;
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
                        <tr key={player.playerId} className={`border-b border-gray-300 ${player.eliminated ? 'bg-red-600/60' : ''}`}>
                            <td className="border border-gray-300 px-4 py-2">{player.playerName}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.remainInTheGamePts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.foundAdvantagePts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.usedAdvantagePts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.shotInTheDarkPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.individualImmunityPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.confessionalPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.individualImmunityPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.tribalImmunityPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.tribalRewardPts}</td>
                            <td className="border border-gray-300 px-4 py-2">{player.totalPoints}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}   