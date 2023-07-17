import { getTanggal } from "../utils/tanggal";
import { db } from "./database";

const tanggal = getTanggal();

const getTodayDiary = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM diary WHERE date = '${tanggal}';`,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const getTodayDiaries = (id, type) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM item_diary WHERE diary_id = ${id} AND type = '${type}' ORDER BY id DESC`,
        [],
        (_, { rows }) => {
          resolve(rows._array);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const setTodayDiary = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO diary VALUES (?, ?);",
        [null, tanggal],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

const inputDiaries = ({ diaryId, type, key, value, time }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO item_diary VALUES (?, ?, ?, ?, ?, ?);",
        [null, diaryId, type, key, value, time],
        (_, { insertId }) => {
          resolve(insertId);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });
};

export { getTodayDiary, getTodayDiaries, setTodayDiary, inputDiaries };
