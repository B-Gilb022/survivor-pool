import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

const dbPath = path.join(dataDir, "app.db");

const db = new Database(dbPath, {
    verbose: process.env.NODE_ENV === "development" ? console.log : undefined
});

export default db;