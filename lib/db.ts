import sql from "mssql";

const config: sql.config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER || "localhost",
    database: process.env.DB_NAME,
    options: {
        trustServerCertificate: true,
    },
};

export default config;
