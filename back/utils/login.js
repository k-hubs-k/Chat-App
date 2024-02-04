import db from "./database.js";
export function login(data, callback) {
  const { username, password } = data;
  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, res) => {
      if (err) {
        callback(err, null);
        return;
      } else {
        callback(null, res[0]);
      }
    },
  );
}

export function register(data, callback) {
  const { username, email, password } = data;

  const check = "SELECT * FROM users WHERE `username` = ? OR `email` = ?";
  db.query(check, [username, email], (err, _res) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (_res.length > 0) {
      // Already exists
      callback(null, { Warning: "This user already exists..." });
      return;
    }
    const sql =
      "INSERT INTO users (`username`,`email`,`password`) VALUES (?, ?, ?)";
    db.query(sql, [username, email, password], (err, result) => {
      if (err) {
        callback(err, null);
      }
      return callback(null, { Succes: "Added succesfully" });
    });
  });
}
