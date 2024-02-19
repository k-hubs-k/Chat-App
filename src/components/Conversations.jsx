// icons
import ChatOptions from "./ChatOptions";
import Avatar from "@mui/material/Avatar";
import Send from "./Send";
import ArrowLeft from "@mui/icons-material/ArrowLeft";

// react
import { useEffect, useLayoutEffect, useState } from "react";

// Database
import axios from "axios";
import { useParams } from "react-router-dom";

/**
 * @param {number} target_id
 * @param {number} lastMessageRef
 * @param {boolean} typingStatus
 * */

const Conversations = ({
  target_id: target_id,
  socket,
  lastMessageRef,
  typingStatus,
  onChangePage,
}) => {
  const [messages, setmessages] = useState([]);
  const [targetInfo, setTargetInfo] = useState({});
  const { id } = useParams();
  const [seen, setSeen] = useState(false);
  const [targetId, setTargetId] = useState(target_id);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:8081/profile/" + targetId).then((res) => {
      setTargetInfo(res.data);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (id) {
      onChangePage(true);
    }
    axios
      .get("http://localhost:8081/conversation/" + id)
      .then((res) => {
        setmessages(res.data);
        setSeen(true);
      })
      .catch((err) => console.log(err));
    if (seen) {
      if (id == 0) return;
      axios.put("http://localhost:8081/seen/" + id);
    }
    setTargetId(id);
  }, [id]);

  useEffect(() => {
    socket.on("messageResponse", (data) => {
      if (data.to_id == target_id) return setmessages([...messages, data]);
    });
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="read">
      {targetId && loaded ? (
        <>
          <div className="userInfo">
            <div className="close" onClick={() => onChangePage(false)}>
              <ArrowLeft />
            </div>
            <div className="">
              <Avatar
                alt="Remy Sharp"
                src={`../../back/public/images/" + ${targetInfo.user.images || "user-default.png"}`}
              />
            </div>
            <p className="name">{targetInfo.user.username || "loading..."}</p>
            <ChatOptions />
          </div>
          <div className="chatArea">
            {messages.length > 0 ? (
              messages.map((msg, key) => {
                return (
                  <div key={key} className="messageContent">
                    <div
                      key={key}
                      className={msg.to_id == targetId ? "msg me" : "msg you"}
                    >
                      {msg.content}
                    </div>
                    <div ref={lastMessageRef} />
                  </div>
                );
              })
            ) : (
              <div className="empty">start the conversation now</div>
            )}
          </div>
          <div>
            <Send socket={socket} target_id={targetId} />
          </div>
        </>
      ) : (
        <div className="starting">Open chat to start</div>
      )}
    </div>
  );
};

export default Conversations;
