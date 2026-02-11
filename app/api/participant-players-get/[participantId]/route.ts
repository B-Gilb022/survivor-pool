
import { prisma } from "@/lib/prisma";

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

    const raw = await prisma.participantsMapper.findMany({
        where: {
        participantId: participantIdNumber,
        season: season,
        },
        include: {
        player: {
            select: {
            playerName: true,
            totalPoints: true,
            eliminated: true,
            },
        },
        },
    });

    const data = raw.map(entry => ({
        playerName: entry.player.playerName,
        totalPoints: entry.player.totalPoints,
        eliminated: entry.player.eliminated,
        first: entry.first,
        second: entry.second,
        third: entry.third,
    }));

    return Response.json(data);
}