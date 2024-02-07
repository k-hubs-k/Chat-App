import db from "./database.js";

export function getAllUsers(callback) {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, res) => {
    if (err) {
      callback({ Error: "Can not getting users" }, null);
      return;
    } else {
      callback(null, { user: res });
    }
  });
}

export function getUser(userId, callback) {
  const sql = "SELECT * FROM users WHERE id = ?";
  db.query(sql, [userId], (err, res) => {
    if (err) {
      callback({ Error: "Can not get this user" }, null);
      return;
    } else {
      return callback(null, { user: res[0] });
    }
  });
}

export function editProfile(currentProfile, callback) {
  const { userId, name, email, pass } = currentProfile;
  const sql =
    "UPDATE users SET `username` = ?, `email` = ?, `password` = ? WHERE id = ?";
  db.query(sql, [name, email, pass, userId], (err, res) => {
    if (err) {
      callback({ Error: "Can't edit this profile" }, null);
      return;
    } else {
      callback(null, { Success: "Edited succesfully" });
    }
  });
}

export function uploadFile(currentfile, callback) {
  const { image, id } = currentfile;
  const sql =
    "UPDATE users SET `images` = ? WHERE id = ?";
  db.query(sql, [image, id], (err, res) => {
    if (err) {
      callback({ Message: "Error" }, null);
      return;
    } else {
      callback(null, { Status: "Succes" });
    }
  });
}
