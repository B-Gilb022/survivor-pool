import { testDatabaseConnection } from "@/lib/database_test";

export async function GET() {
    const result = await testDatabaseConnection();
    return Response.json({ result });
}