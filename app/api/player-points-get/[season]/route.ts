import db from "@/lib/db/database";
import { initializeDatabase } from "@/lib/db/init";

export async function GET(req: Request, { params }: { params: Promise<{ season: string }> }) {
    initializeDatabase();

    const { season } = await params;
    const seasonNumber = Number(season);

    if (Number.isNaN(seasonNumber)) {
        return new Response(
            JSON.stringify({ error: "Invalid season parameter" }),
            { status: 400 }
        );
    }

    const playerPoints = db.prepare(`
        SELECT
            Players.PlayerId,
            PlayerPoints.PlayerName,
            RemainInTheGamePts,
            FoundAdvantagePts,
            UsedAdvantagePts,
            ShotInTheDarkPts,
            IndividualRewardPts,
            ConfessionalPts,
            IndividualImmunityPts,
            TribalImmunityPts,
            TribalRewardPts,
            Players.TotalPoints,
            Players.Eliminated
        FROM PlayerPoints
        LEFT JOIN Players
            ON PlayerPoints.PlayerId = Players.PlayerId
        WHERE Players.Season = ?
    `).all(seasonNumber);

    return Response.json(playerPoints);
}