const fs = require("fs");
const path = require("path");
const { neon } = require("@neondatabase/serverless");
const { loadLocalEnv } = require("./loadEnv");

loadLocalEnv();

const connectionString =
  process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL_UNPOOLED or DATABASE_URL is required");
}

const sql = neon(connectionString);
const migrationsDirectory = path.resolve(process.cwd(), "db/migrations");

const splitStatements = (source) =>
  source
    .split(/;\s*(?:\r?\n|$)/)
    .map((statement) => statement.trim())
    .filter(Boolean);

const migrate = async () => {
  await sql`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;

  const appliedRows = await sql`SELECT name FROM schema_migrations`;
  const applied = new Set(appliedRows.map((row) => row.name));
  const files = fs
    .readdirSync(migrationsDirectory)
    .filter((filename) => filename.endsWith(".sql"))
    .sort();

  for (const filename of files) {
    if (applied.has(filename)) {
      console.log(`skip ${filename}`);
      continue;
    }

    const source = fs.readFileSync(
      path.join(migrationsDirectory, filename),
      "utf8"
    );
    const statements = splitStatements(source);

    await sql.transaction((transaction) => [
      ...statements.map((statement) => transaction.query(statement)),
      transaction`
        INSERT INTO schema_migrations (name)
        VALUES (${filename})
      `,
    ]);
    console.log(`applied ${filename}`);
  }
};

migrate().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
