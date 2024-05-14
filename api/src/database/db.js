import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const connectDB = async () => {
  const db = await open({
    filename: "./api/src/database/database.db",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS Favorites (
      email TEXT,
      image TEXT,
      post  TEXT,
      PRIMARY KEY (email, image)
    )
  `);

  return db;
};
