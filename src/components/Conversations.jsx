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
  const { id } = useParams();
  const [message, setmessage] = useState([]);
  const [targetUser, setTargetUser] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [info, setInfo] = useState({});

  const socket = io("http://localhost:8081");

  useEffect(() => {
    if (!fetched && id) {
      axios
        .get("http://localhost:8081/")
        .then((res) => {
          setInfo(res.data);
        })
        .catch((err) => {
          console.log(err.code);
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
  }, []);
  useEffect(() => {
    if (!id) return;
    axios
      .get("http://localhost:8081/conversation/" + id)
      .then((res) => {
        setConversations(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    if (!id) return;
    return () => {
      socket.disconnect();
    };
  }, [id]);

  const hundleSubmit = (e) => {
    e.preventDefault();
    const date1 = new Date();
    axios
      .post("http://localhost:8081/send", { target_id, message, date1 })
      .then((res) => {
        let tmp = conversations;
        tmp.push({
          from_id: info.userId,
          to_id: target_id,
          content: message,
        });
        setConversations(tmp);
        setmessage("");
        socket.emit("send messages", info.userId, id);

        document.querySelector(".chatArea").scrollTop =
          document.querySelector(".chatArea").scrollHeight;
      })
      .catch((err) => {
        toast.error("Unable to send:" + err.code, popupOptions);
      });
  };

  socket.on("receive message", (msg) => {
    if (msg._target == info.userId) {
      setConversations(msg.conversations);

      document.querySelector(".chatArea").scrollTop =
        document.querySelector(".chatArea").scrollHeight;
    }
  });

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
