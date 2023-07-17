import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
const db = SQLite.openDatabase("database.db");

const createTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            age INTEGER,
            age_of_pregnant TEXT,
            address TEXT,
            baby_name TEXT
        );
    `,
      [],
      () => console.log("users table created successfully"),
      (error) => console.log("Error creating table users:", error)
    );

    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT DEFAULT (date('now', 'localtime'))
        );
    `,
      [],
      () => console.log("diary table created successfully"),
      (error) => console.log("Error creating table diary:", error)
    );

    tx.executeSql(
      `
        CREATE TABLE IF NOT EXISTS item_diary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            diary_id INTEGER,
            type TEXT,
            key TEXT,
            value TEXT,
            time TEXT,
            FOREIGN KEY (diary_id) REFERENCES diary(id)
        );
    `,
      [],
      () => console.log("item_diary created successfully"),
      (error) => console.log("Error creating table item_diary:", error)
    );
  });
};

const destroyDatabase = async () => {
  db.transaction((tx) => {
    tx.executeSql(
      `DROP TABLE users;`,
      [],
      () => console.log("users table deleted successfully"),
      (error) => console.log("Error deleting table users:", error)
    );

    tx.executeSql(
      `DROP TABLE diary;`,
      [],
      () => console.log("diary table deleted successfully"),
      (error) => console.log("Error deleting table diary:", error)
    );

    tx.executeSql(
      `DROP TABLE item_diary;`,
      [],
      () => console.log("item_diary deleted successfully"),
      (error) => console.log("Error deleting table item_diary:", error)
    );
  });
};

export { db, createTables, destroyDatabase };
