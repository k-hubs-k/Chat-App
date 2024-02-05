// icons
import ChatOptions from "./ChatOptions";
import Avatar from "@mui/material/Avatar";
import SendOutlined from "@mui/icons-material/SendOutlined";
import SendEmoji from "./SendEmoji";

// react
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Database
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import popupOptions from "../utils/toastOptions";
import { io } from "socket.io-client";

const Conversations = ({ target_id, handleChange }) => {
  const [conversations, setConversations] = useState([]);
  const [info, setInfo] = useState({});
  const { id } = useParams();
  const [message, setmessage] = useState([]);
  const [targetUser, setTargetUser] = useState([]);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const socket = io("http://localhost:8081");
    if (fetched) {
      socket.emit("get messages", { id: info.userId, target: id });
      socket.on("get messages", (msg) => {
        console.log(msg);
        console.log("for me");
        setConversations(msg);
      });
      socket.on("receive message", (data) => {
        console.log(data);
      });
    }
    if (!fetched && id) {
      axios
        .get("http://localhost:8081")
        .then((res) => {
          setInfo(res.data);
        })
        .catch((err) => {
          console.log("err : ", err.code);
        });

      handleChange(id);
      axios
        .get("http://localhost:8081/profile/" + id)
        .then((res) => {
          setTargetUser(res.data.user);
        })
        .catch((err) => {
          toast.error("Can not load this user : " + err, popupOptions);
        });
      setFetched(true);
    }
    return () => {
      socket.disconnect();
    };
  }, [id]);

  const hundleSubmit = (e) => {
    if (!fetched) return;
    e.preventDefault();
    const date1 = new Date();
    axios
      .post("http://localhost:8081/send", { target_id, message, date1 })
      .then((res) => {
        document.querySelector(".chatArea").scrollTop =
          document.querySelector(".chatArea").scrollHeight;
        console.log(res);
        socket.emit("send messages", info.userId, target_id);
      })
      .catch((err) => {
        toast.error("Unable to send:" + err.code, popupOptions);
      });
  };

  return (
    <div className="read">
      {conversations && targetUser ? (
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
            {conversations.map((msg, key) => {
              return (
                <div
                  key={key}
                  className={msg.from_id != target_id ? "msg me" : "msg you"}
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
              <SendOutlined onClick={hundleSubmit} sx={{ cursor: "pointer" }} />
            </form>
          </div>
        </>
      ) : (
        <div className="starting">Open chat to start</div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Conversations;
