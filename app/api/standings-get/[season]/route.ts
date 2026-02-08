
import db from "@/lib/db/database";
import { initializeDatabase } from "@/lib/db/init";

type RouteParams = {
    params: {
        season: string;
    };
};


export async function GET(request: Request, { params }: RouteParams) {
    initializeDatabase();

    const { season } = await params;
    const seasonNumber = Number(season);

    if (Number.isNaN(seasonNumber)) {
        return new Response(
            JSON.stringify({ error: "Invalid season parameter" }),
            { status: 400 }
        );
    }

    const standings = db.prepare(`
        SELECT 
            Participants.ParticipantId,
            ParticipantName,
            SUM(TotalPoints) +
			SUM(
				CASE WHEN First = 1 AND Players.PlayerName = 'Savannah' THEN 75 ELSE 0 END +
				CASE WHEN Second = 1 AND Players.PlayerName = 'Sophi' THEN 50 ELSE 0 END +
				CASE WHEN Third = 1 AND Players.PlayerName = 'Sage' THEN 50 ELSE 0 END +
				CASE WHEN First = 1 AND (Players.PlayerName = 'Sophi' OR Players.PlayerName = 'Sage') THEN 30 ELSE 0 END +
				CASE WHEN Second = 1 AND (Players.PlayerName = 'Savannah' OR Players.PlayerName = 'Sage') THEN 30 ELSE 0 END +
				CASE WHEN Third = 1 AND (Players.PlayerName = 'Savannah' OR Players.PlayerName = 'Sophi') THEN 30 ELSE 0 END
			) AS TotalPoints,
            CONCAT(SUM(CASE WHEN Eliminated = 0 THEN 1 ELSE 0 END),'/',COUNT(Eliminated)) AS RemainingPlayers
        FROM ParticipantsMapper
        LEFT JOIN Participants
            ON ParticipantsMapper.ParticipantId = Participants.ParticipantId
        LEFT JOIN Players
            ON ParticipantsMapper.PlayerId = Players.PlayerId
        WHERE TotalPoints IS NOT NULL
        AND ParticipantsMapper.Season = ?
        GROUP BY ParticipantName
        ORDER BY TotalPoints DESC
    `).all(season);

    return Response.json(standings);
}