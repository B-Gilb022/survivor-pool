import Image from "next/image";
import Link from "next/link";

type Standing = {
  ParticipantId: number;
  ParticipantName: string;
  TotalPoints: number;
  RemainingPlayers: string;
};

const CURRENT_SEASON = 49;

async function getStandings(): Promise<Standing[]> {
  const res = await fetch(`http://localhost:3000/api/standings-get/${CURRENT_SEASON}`, { cache: "no-store" });
  
  if (!res.ok) {
    throw new Error("Failed to fetch standings");
  }

  return res.json();
}

export default async function Standings() {
  const standings = await getStandings();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800 text-white">
      <Image
        src="/Survivor-Logo.png"
        alt="Survivor Logo"
        width={600}
        height={600}
        className="absolute top-4 right-0 w-150 h-auto"
        priority
      />
      <br>
      </br>
      <main>
        <div>

          <Link
            href="/"
            className="absolute top-4 left-4 text-gray-300 hover:text-white transition-colors duration-300"
          >
              &larr; Back to Homepage
          </Link>

          <h2 className="text-3xl font-semibold text-center">
            Survivor 50 Pool Standings
          </h2>

          <table className="mt-8 border-collapse border border-gray-600 text-lg text-center">
            <thead className="bg-gray-500">
              <tr className="border-b">
                <th className="px-8 py-2 text-center font-semibold">
                </th>
                <th className="px-8 py-2 text-center font-semibold">
                  Name
                </th>
                <th className="px-8 py-2 text-center font-semibold">
                  Total Points
                </th>
                <th className="px-8 py-2 text-center font-semibold">
                  Players Remaining
                </th>
              </tr>
            </thead>

            <tbody>
              {standings.map((row, index) => (
                <tr key={index} className="border-b border-l border-r">
                  <td className="px-8 py-2">
                    {index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : index + 1}
                  </td>
                  <td className="px-8 py-2 hover:underline">
                    <Link
                      href={`/participant/${row.ParticipantId}?season=${CURRENT_SEASON}&name=${encodeURIComponent(row.ParticipantName)}`}
                    >
                      {row.ParticipantName}
                    </Link>
                  </td>
                  <td className="px-8 py-2">{row.TotalPoints}</td>
                  <td className="px-8 py-2">{row.RemainingPlayers}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <Link
            href={`/player-points/${CURRENT_SEASON}`}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 rounded-lg bg-indigo-600 px-6 py-3 text-lg font-semibold text-white hover:bg-indigo-500"
          >
            📊 View Player Points Breakdown
          </Link>
        </div>
      </main>
    </div>
    

  );
}