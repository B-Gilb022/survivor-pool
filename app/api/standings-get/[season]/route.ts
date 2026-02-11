
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

type Standing = {
    participantId: number,
    participantName: string,
    totalPoints: number,
    remaining: number,
    totalPlayers: number,
}


export async function GET(_: NextRequest, context: { params: Promise<{ season: string }> }) {
    const { season } = await context.params;
    const seasonNumber = Number(season);

    // Podium Placement Set-up
    let firstPlace = "";
    let secondPlace = "";
    let thirdPlace = "";
    if (seasonNumber === 47){
        firstPlace = "Rachel"
        secondPlace = "Sam"
        thirdPlace = "Sue"
    }
    else if (seasonNumber === 48){
        firstPlace = "Kyle"
        secondPlace = "Eva"
        thirdPlace = "Joe"
    }
    else if (seasonNumber === 49){
        firstPlace = "Savannah"
        secondPlace = "Sophi"
        thirdPlace = "Sage"
    }

    if (Number.isNaN(seasonNumber)) {
        return new Response(
            JSON.stringify({ error: "Invalid season parameter" }),
            { status: 400 }
        );
    }

    const rows = await prisma.participantsMapper.findMany({
        where: {
        season: seasonNumber,
        },
        include: {
            participant: true,
            player: true,
        },
    });

    const standingsMap = new Map<number, {
        participantId: number;
        participantName: string;
        totalPoints: number;
        remaining: number;
        totalPlayers: number;
    }>();

    for (const row of rows) {
        const bonus =
        (row.first && row.player.playerName === firstPlace ? 75 : 0) +
        (row.second && row.player.playerName === secondPlace ? 50 : 0) +
        (row.third && row.player.playerName === thirdPlace ? 50 : 0) +
        (row.first && [secondPlace, thirdPlace].includes(row.player.playerName) ? 30 : 0) +
        (row.second && [firstPlace, thirdPlace].includes(row.player.playerName) ? 30 : 0) +
        (row.third && [firstPlace, secondPlace].includes(row.player.playerName) ? 30 : 0);

        const current = standingsMap.get(row.participantId) ?? {
        participantId: row.participantId,
        participantName: row.participant.participantName,
        totalPoints: 0,
        remaining: 0,
        totalPlayers: 0,
        };

        current.totalPoints += row.player.totalPoints + bonus;
        current.totalPlayers += 1;
        if (!row.player.eliminated) current.remaining += 1;

        standingsMap.set(row.participantId, current);
    }

    const standings = Array.from(standingsMap.values())
        .map((p: Standing) => ({
        ParticipantId: p.participantId,
        ParticipantName: p.participantName,
        TotalPoints: p.totalPoints,
        RemainingPlayers: `${p.remaining}/${p.totalPlayers}`,
        }))
        .sort((a, b) => b.TotalPoints - a.TotalPoints);

    return Response.json(standings);
}