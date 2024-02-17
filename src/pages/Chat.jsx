import { useEffect, useState } from "react";
import List from "@mui/material/List";
import Messages from "../components/Messages";
import Conversations from "../components/Conversations.jsx";
import { useRef } from "react";

const Chat = ({ socket }) => {
  const [idConversation, setIdConversation] = useState(0);

  const openConversation = (_id) => {
    setIdConversation(_id);
  };

  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [1]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  return (
    <div className="chat page">
      <div className="messages active">
        <div className="searchBox">
          <input type="text" placeholder="Search" />
        </div>
        <List sx={{ width: "100%", maxWidth: 360 }}>
          <Messages
            onOpenChat={openConversation}
            socket={socket}
            lastMessageRef={lastMessageRef}
          />
        </List>
      </div>
      <Conversations
        target_id={idConversation}
        socket={socket}
        typingStatus={typingStatus}
        lastMessageRef={lastMessageRef}
      />
    </div>
  );
};

export default Chat;

