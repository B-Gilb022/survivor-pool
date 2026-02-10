import BackButton from "@/app/components/BackButton";

interface ParticipantPageProps {
    params: Promise<{ participantId: string }>;
    searchParams: Promise<{ season?: string; name?: string }>;
}

type Player = {
  PlayerId: number;
  PlayerName: string;
  TotalPoints: number;
  Eliminated: boolean;
  First: boolean;
  Second: boolean;
  Third: boolean;
};

export default async function ParticipantPage({ params, searchParams }: ParticipantPageProps) {
    const { participantId } = await params;
    const { season, name } = await searchParams;

    const seasonNumber = season ? Number(season) : null;
    const participantIdNumber = Number(participantId);

    const res = await fetch(`http://localhost:3000/api/participant-players-get/${participantIdNumber}?season=${seasonNumber ?? ''}`, { cache: "no-store" });

    const data: Player[] = await res.json();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
            <BackButton />
            <br />
            <main>
                <h2 className="text-3xl font-semibold text-center mb-6">
                    {name} - Season {seasonNumber}
                </h2>
            
                <table className="border-collapse border border-gray-600 text-lg text-center">
                    <thead className="bg-gray-500">
                        <tr className="border-b">
                            <th className="px-8 py-2 text-center font-semibold">Placement</th>
                            <th className="px-8 py-2 text-center font-semibold">Player Name</th>
                            <th className="px-8 py-2 text-center font-semibold">Total Points</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((player) => (
                            <tr className={`border-b ${player.Eliminated ? 'bg-red-600/60' : ''}`}>
                                <td className="px-8 py-2">
                                    {player.First ? "🥇" : player.Second ? "🥈" : player.Third ? "🥉" : ""}
                                </td>
                                <td className="px-8 py-2">{player.PlayerName}</td>
                                <td className="px-8 py-2">{player.TotalPoints}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </main>
        </div>
    );
}