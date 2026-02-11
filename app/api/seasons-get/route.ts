import { prisma } from "@/lib/prisma";

type Season = {
    season: number
}

export async function GET() {

    const seasons = await prisma.participantsMapper.findMany({
    distinct: ["season"],
    orderBy: {
        season: "desc",
    },
    select: {
        season: true,
    },
    });

    return Response.json(seasons.map((s: Season) => s.season));
}