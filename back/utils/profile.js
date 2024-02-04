import db from "./database.js";
export function getUser(userId, callback) {
  const sql = "SELECT id, username, email, images FROM users WHERE id = ?";
  db.query(sql, [userId], (err, res) => {
    if (err) {
      callback({ Error: "Can not get this user" }, null);
      return;
    } else {
      callback(null, { user: res[0] });
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
