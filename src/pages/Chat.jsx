import { useEffect, useState } from "react";
import List from "@mui/material/List";
import Messages from "../components/Messages";
import Conversations from "../components/Conversations.jsx";

const Chat = () => {
  const [idConversation, setIdConversation] = useState(0);
  const [messages, setMessages] = useState([]);

  const openConversation = (_id) => {
    setIdConversation(_id);
  };

  return (
    <div className="chat">
      <div className="messages active">
        <div className="searchBox">
          <input type="text" placeholder="Search" />
        </div>
        <List sx={{ width: "100%", maxWidth: 360 }}>
          <Messages onOpenChat={openConversation} />
        </List>
      </div>
      {
        <Conversations
          target_id={idConversation}
          handleChange={openConversation}
        />
      }
    </div>
  );
};

export default Chat;
