// icons
import ChatOptions from "./ChatOptions";
import Avatar from "@mui/material/Avatar";
import Send from "./Send";

// react
import { useEffect, useLayoutEffect, useState } from "react";

// Database
import axios from "axios";
import { useParams } from "react-router-dom";

const Conversations = ({ target_id, socket, lastMessageRef, typingStatus }) => {
  const [messages, setmessages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8081/conversation/"+id)
      .then((res) => {
        setmessages(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    socket.on('messageResponse', (data) => setmessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="read">
      {target_id ? (
          <>
            <div className="userInfo">
              <div className="">
                <Avatar
                  alt="Remy Sharp"
                  src={
                    "../../back/public/images/" ||
                    "user-default.png"
                  }
                />
              </div>
              <p className="name">user</p>
              <ChatOptions />
            </div>
            <div className="chatArea">
              {
                messages.map((msg, key) => {
                return (
                  <>
                    <div
                      key={key}
                      className={msg.from_id != target_id ? "msg me" : "msg you"}
                    >
                      {msg.content}
                    </div>
                    <div ref={lastMessageRef} />
                  </>
                )})
              }
            </div>
            <div>
              <Send socket={socket} target_id={target_id} />
            </div>
          </>
      ) : (
        <div className="starting">Open chat to start</div>
      )}
    </div>
  );
};

export default Conversations;