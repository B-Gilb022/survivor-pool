import sql from "mssql";
import config from "./db";

export async function testDatabaseConnection() {
    try {
        const pool = await sql.connect(config);
        
        const result = await pool.request().query("SELECT TOP 1 ParticipantName FROM Participants");

        return result.recordset[0]?.ParticipantName ?? "No Participants Found";
    } catch (err) {
        console.error("Database error:", err);
    }
}