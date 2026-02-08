
import db from "@/lib/db/database";

export async function GET(req: Request, { params }: { params: Promise<{ participantId: string }> }) {
    const { participantId } = await params;
    const participantIdNumber = Number(participantId);
    const { searchParams } = new URL(req.url);
    const season = Number(searchParams.get("season"));

    if (Number.isNaN(season)) {
        return new Response(
            JSON.stringify({ error: "Invalid season parameter" }),
            { status: 400 }
        );
    }

    const data = db.prepare(
        `SELECT 
            Players.PlayerName,
            Players.TotalPoints,
            Players.Eliminated,
            ParticipantsMapper.First,
            ParticipantsMapper.Second,
            ParticipantsMapper.Third
        FROM ParticipantsMapper
        LEFT JOIN Players
            ON ParticipantsMapper.PlayerId = Players.PlayerId 
        WHERE 
            ParticipantsMapper.ParticipantId = ? 
            AND ParticipantsMapper.Season = ?`,
    ).all(participantIdNumber, season);

    return new Response(JSON.stringify(data));
}