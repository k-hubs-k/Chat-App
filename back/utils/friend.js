import db from "./database.js";
import { getUser } from "./profile.js";

export const GetFriends = (userId, callback) => {
  let friendIds = [];
  const sql = "SELECT * FROM friends WHERE id_1 = ? OR id_2 = ?";
  db.query(sql, [userId, userId], (err, res) => {
    if (err) {
      callback(err, null);
    } else {
      friendIds = res;
      GetFriendInfo(friendIds, userId, (err, res) => {
        if (err) {
          console.log(err);
        } else {
          callback(null, res);
        }
      });
    }
  });
};

const GetFriendInfo = (data, userId, callback) => {
  let out = [];
  if (data.length > 0) {
    data.map((item, key) => {
      const userToGet = item.id_1 == userId ? item.id_2 : item.id_1;
      getUser(userToGet, (error, info) => {
        if (error) {
          console.log("Getting user error:", error);
          callback(error, null);
        } else {
          out.push({
            userInfo: info.user,
            to_id: item.id_2,
            friendId: item.id,
            state: item.is_pending,
          });
          console.log("out : ", out);
          if (key == data.length - 1) {
            callback(null, out);
          }
        }
      });
    });
  }
};

export const AddFriend = (userId, toAddId, callback) => {
  // Check if this request is not already did
  const checkSQL = "SELECT * FROM friends WHERE id_1 = ? AND id_2 = ?";
  db.query(checkSQL, [userId, toAddId], (err, res) => {
    if (err) {
      console.log("SQL error: ", err);
      callback(err, null);
      return;
    } else if (res.length > 0) {
      callback("Aleready in database", null);
      return;
    } else {
      // if not, do:
      const sql =
        "INSERT INTO `friends` (`id`, `id_1`, `id_2`, `is_pending`) VALUES (NULL, ?, ?, '1') ";
      db.query(sql, [userId, toAddId], (err, res) => {
        if (err) {
          console.log("SQL error: ", err);
          callback(err, null);
          return;
        } else if (res) {
          callback({ Succes: "Friend request sent" });
        }
      });
    }
  });
};

export const updateFriend = (friendId, callback) => {
  const sql =
    "UPDATE `friends` SET `is_pending` = '0' WHERE `friends`.`id` = ?";
  db.query(sql, [friendId], (err, res) => {
    if (err) {
      console.log("SQL error : ", err);
      callback(err, null);
    } else {
      callback(null, res);
    }
  });
};
