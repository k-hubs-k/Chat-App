// icons
import ChatOptions from "./ChatOptions";
import Avatar from "@mui/material/Avatar";
import SendOutlined from "@mui/icons-material/SendOutlined";
import SendEmoji from "./SendEmoji";

// react
import { useEffect, useState } from "react";

// Database
import axios from "axios";

const Conversations = ({ target_id }) => {
  const [message, setmessage] = useState("");
  const [allConversations, setConversations] = useState([]);
  const [activeUser, setActiveUser] = useState(0);
  const [targetUser, setTargetUser] = useState({});

  useEffect(() => {
    if (target_id > 0)
      axios
        .get("http://localhost:8081/conversation/" + target_id)
        .then((res) => {
          setConversations(res.data.conversations);
          setActiveUser(res.data.you); // Can help to giving className to messages
          setTargetUser(res.data.target_info);
        })
        .catch(() => {
          console.log("Unable to load this conversation");
        });
    if (target_id > 0) {
      document.querySelector(".chatArea").scrollTop =
        document.querySelector(".chatArea").scrollHeight;
    }
  }, [target_id]);

  const hundleSubmit = (e) => {
      e.preventDefault();
      const date1 = new Date()
      axios
        .post("http://localhost:8081/send", {target_id, message, date1})
        .then((res) => {
          console.log(res);
          setmessage('');
        })
        .catch(() => {
          console.log("Unable to load this conversation");
        });
  }

  return (
    <div className="read">
      {target_id ? (
        <>
          <div className="userInfo">
            <div className="">
              <Avatar
                alt="Remy Sharp"
                src={
                  "../../back/public/images/" + targetUser.images ||
                  "user-default.png"
                }
              />
            </div>
            <p className="name">{targetUser.username}</p>
            <ChatOptions />
          </div>
          <div className="chatArea">
            {allConversations.map((msg) => {
              return (
                <div
                  key={msg.id}
                  className={msg.from_id == activeUser ? "msg me" : "msg you"}
                >
                  {msg.content}
                </div>
              );
            })}
          </div>
          <div>
            <form className="type" onSubmit={hundleSubmit}>
              <input
                type="text"
                placeholder="Message"
                value={message}
                onChange={(e) => {
                  setmessage(e.target.value);
                }}
              />
              <SendEmoji setmessage={setmessage} />
              <SendOutlined onClick={hundleSubmit} sx={{ cursor: "pointer"}} />
            </form>
          </div>
        </>
      ) : (
        <div className="starting">Open chat to start</div>
      )}
    </div>
  );
};

export default Conversations;
