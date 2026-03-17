import * as SQLite from "expo-sqlite";
import { useEffect } from "react";

const db = SQLite.openDatabaseSync("flowspend.db");

export function useDatabase() {
  useEffect(() => {
    try {
      db.execSync(`
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          icon TEXT,
          color TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS transactions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          amount REAL NOT NULL,
          type TEXT CHECK(type IN ('income','expense')) NOT NULL,
          category_id INTEGER,
          note TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id)
        );

        CREATE TABLE IF NOT EXISTS budgets (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category_id INTEGER,
          limit_amount REAL NOT NULL,
          period TEXT CHECK(period IN ('daily','weekly','monthly')) NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (category_id) REFERENCES categories(id)
        );
      `);
    } catch (e) {
      console.log("DB init error", e);
    }
  }, []);
}
