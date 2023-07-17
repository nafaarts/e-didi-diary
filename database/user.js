import { db } from "./database";

const addUser = ({ name, age, ageOfPregnant, address, babyName }) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO users (name, age, age_of_pregnant, address, baby_name) VALUES (?, ?, ?, ?, ?)",
        [name, age, ageOfPregnant, address, babyName],
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

const getUser = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM users WHERE id = 1",
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

export { addUser, getUser };
