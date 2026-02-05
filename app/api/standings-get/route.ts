
import db from "@/lib/db/database";
import { initializeDatabase } from "@/lib/db/init";

export async function GET() {
    initializeDatabase();

    const standings = db.prepare(`
        SELECT 
            ParticipantName,
            SUM(TotalPoints) AS TotalPoints,
            CONCAT(SUM(CASE WHEN Eliminated = 0 THEN 1 ELSE 0 END),'/',COUNT(Eliminated)) AS RemainingPlayers
        FROM ParticipantsMapper
        LEFT JOIN Participants
            ON ParticipantsMapper.ParticipantId = Participants.ParticipantId
        LEFT JOIN Players
            ON ParticipantsMapper.PlayerId = Players.PlayerId
        WHERE TotalPoints IS NOT NULL
        AND ParticipantsMapper.Season = 49
        GROUP BY ParticipantName
        ORDER BY TotalPoints DESC
    `).all();

    return Response.json(standings);
}