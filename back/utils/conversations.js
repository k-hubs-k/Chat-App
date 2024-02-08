import db from "./database.js";
export function getConversations(_id, callback) {
  const sql =
    "SELECT * FROM conversations WHERE from_id = ? OR to_id = ? ORDER BY id DESC";
  db.query(sql, [_id, _id], (err, res) => {
    if (err) {
      callback({ Error: "Error inside server" });
      console.log(err);
      callback(err, null);
      return;
    } else {
      callback(null, res);
    }
  });
}

export function getChats(_id, _target_id, callback) {
  const sql =
    "SELECT * FROM conversations WHERE from_id = ? AND to_id = ? OR from_id = ? AND to_id = ?";
  db.query(sql, [_id, _target_id, _target_id, _id], (err, res) => {
    if (err) {
      callback({ Error: "Error inside server" });
      console.log(err);
      return;
    } else {
      callback(null, res);
    }
  });
}

export function sendMessages(values, callback) {
  const sql =
    "INSERT INTO conversations (`from_id`,`to_id`,`content`,`time`) VALUES (?)";
  db.query(sql, [values], (err, result) => {
    if (err) callback({ Error: err }, null);
    return callback(null, { Succes: result });
  });
}

export function seeMessage(targetId, userId, callback) {
  const sql =
    "UPDATE `conversations` SET `seen` = ? WHERE from_id = ? AND to_id = ?";
  db.query(sql, [1, targetId, userId], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      callback(res);
    }
  });
}
