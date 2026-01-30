import Image from "next/image";

// Test Database call
import { testDatabaseConnection } from "@/lib/database_test";

type StandingsRow = {
  rank: number;
  name: string;
  totalPoints: number;
  playersRemaining: string;
}


const data: StandingsRow[] = [
  { rank: 1, name: "Ben", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 2, name: "Cam", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 3, name: "Geoff", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 4, name: "Dan", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 5, name: "Joanne", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 6, name: "Ivy", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 7, name: "Gavin", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 8, name: "Nanny", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 9, name: "Papa", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 10, name: "Cal", totalPoints: 0, playersRemaining: "0/5" },
  { rank: 11, name: "Cara", totalPoints: 0, playersRemaining: "0/5" },
];


export default async function Standings() {
  const dbResult = await testDatabaseConnection(); //NEED TO FIX THIS
  
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
          <input type="text" value={dbResult} readOnly/>
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
              {data.map((row, index) => (
                <tr key={index} className="border-b border-l border-r">
                  <td className="px-8 py-2">
                    {row.rank === 1 ? "🥇" : row.rank === 2 ? "🥈" : row.rank === 3 ? "🥉" : row.rank}
                  </td>
                  <td className="px-8 py-2">{row.name}</td>
                  <td className="px-8 py-2">{row.totalPoints}</td>
                  <td className="px-8 py-2">{row.playersRemaining}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
    

  );
}