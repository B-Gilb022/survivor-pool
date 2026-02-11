import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";


export async function GET(_: Request, context: { params: Promise<{ season: string }> }) {
    const { season } = await context.params;
    const seasonNumber = Number(season);

    if (Number.isNaN(seasonNumber)) {
        return new Response(
            JSON.stringify({ error: "Invalid season parameter" }),
            { status: 400 }
        );
    }

    const raw = await prisma.playerPoints.findMany({
        where: {
        player: {
            season: seasonNumber,
        },
        },
        include: {
        player: {
            select: {
            playerId: true,
            playerName: true,
            totalPoints: true,
            eliminated: true,
            },
        },
        },
    });

    const playerPoints = raw.map(p => ({
        playerId: p.player.playerId,
        playerName: p.player.playerName,
        remainInTheGamePts: p.remainInTheGamePts,
        foundAdvantagePts: p.foundAdvantagePts,
        usedAdvantagePts: p.usedAdvantagePts,
        shotInTheDarkPts: p.shotInTheDarkPts,
        individualRewardPts: p.individualRewardPts,
        confessionalPts: p.confessionalPts,
        individualImmunityPts: p.individualImmunityPts,
        tribalImmunityPts: p.tribalImmunityPts,
        tribalRewardPts: p.tribalRewardPts,
        totalPoints: p.player.totalPoints,
        eliminated: p.player.eliminated,
    }));

    return Response.json(playerPoints);
}