import axios from "axios";
import { useState } from "react";

export function GetConversations(comeback) {
  function getTargetInfo(_id, callback) {
    if (_id) {
      axios
        .get("http://localhost:8081/user/" + _id)
        .then((res) => {
          callback(null, res.data);
        })
        .catch((err) => {
          callback(err, null);
        });
    }
  }

  axios
    .get("http://localhost:8081/conversation")
    .then((res) => {
      comeback(null, filterUniqueById(res.data));
    })
    .catch(() => {
      return;
    });
}

// export function GetChatWithSomeone(target) {
//   const [out, setOut] = useState([]);
// }
