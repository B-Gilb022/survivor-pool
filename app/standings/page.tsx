import Image from "next/image";

type Standing = {
  ParticipantName: string;
  TotalPoints: number;
  RemainingPlayers: string;
}

async function getStandings(): Promise<Standing[]> {
  const res = await fetch("http://localhost:3000/api/standings-get", { cache: "no-store" });
  
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
        src="/survivor-logo-png-transparent.png"
        alt="Survivor Logo"
        width={200}
        height={100}
        className="fixed absolute top-0 right-4 w-75 h-75"
        priority
      />
      <br>
      </br>
      <main>
        <div>
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
                  <td className="px-8 py-2">{row.ParticipantName}</td>
                  <td className="px-8 py-2">{row.TotalPoints}</td>
                  <td className="px-8 py-2">{row.RemainingPlayers}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
    

  );
}