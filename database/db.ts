// database.ts
import { openDatabaseAsync, type SQLiteDatabase } from 'expo-sqlite';

let db: SQLiteDatabase;

export const initDB = async () => {
  db = await openDatabaseAsync('greenhouses.db');

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS greenhouses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type TEXT NOT NULL,
      cover_material TEXT,
      length REAL,
      width REAL,
      gutter_height REAL,
      roof_height REAL,
      has_windows INTEGER,
      front_window_count INTEGER,
      front_window_width REAL,
      front_window_height REAL,
      lateral_window_count INTEGER,
      lateral_window_width REAL,
      lateral_window_height REAL,
      has_skylights INTEGER,
      skylight_count INTEGER,
      skylight_width REAL,
      skylight_height REAL,
      has_anti_aphid_mesh INTEGER,
      ventilation_area REAL,
      ventilation_percent REAL
    );
  `);

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS vpd_records (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      greenhouse_id INTEGER NOT NULL,
      timestamp INTEGER NOT NULL,
      temperature REAL NOT NULL,
      humidity REAL NOT NULL,
      soil_moisture REAL NOT NULL,
      vpd REAL NOT NULL,
      FOREIGN KEY (greenhouse_id) REFERENCES greenhouses(id) ON DELETE CASCADE
    );
  `);
};

export const getDB = (): SQLiteDatabase => {
  if (!db) throw new Error('DB not initialized. Call initDB() first.');
  return db;
};
