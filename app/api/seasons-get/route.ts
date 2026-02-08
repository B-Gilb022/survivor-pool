import db from "@/lib/db/database";
import { initializeDatabase } from "@/lib/db/init";

type SeasonRow = {
  Season: number;
};

export async function GET() {
    initializeDatabase();

    const seasons = db.prepare(`
        SELECT DISTINCT Season
        FROM ParticipantsMapper
        ORDER BY Season DESC
    `).all() as SeasonRow[];

    return Response.json(
        seasons.map(s => s.Season)
    );
}