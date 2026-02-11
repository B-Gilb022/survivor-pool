import { prisma } from "@/lib/prisma";


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

    return Response.json(seasons.map(s => s.season));
}