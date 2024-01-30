import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { toast } from "react-toastify";
import popupOptions from "../utils/toastOptions";

const Messages = ({ onOpenChat }) => {
  const [messages, setMessages] = useState([]);
  const [fetched, setFetched] = useState(false);
  useEffect(() => {
    if (!fetched) {
      axios
        .get("http://localhost:8081/conversation")
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          toast.error(
            "Error on fetching messages " + err.messages,
            popupOptions,
          );
        });
      setFetched(true);
    }
  }, []);

  const handleClick = (_id) => {
    onOpenChat(_id);
  };

  return messages.map((msg) => {
    const imgPath = "../../back/public/images/" + msg.images;
    return (
      <NavLink
        to={"" + msg.user_id}
        onClick={() => handleClick(msg.user_id)}
        key={msg.user_id}
        className="message"
      >
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar alt="Remy Sharp" src={imgPath} />
          </ListItemAvatar>
          <ListItemText
            primary={msg.username}
            secondary={
              <React.Fragment>
                <Typography
                  sx={{ display: "inline", overflow: "hidden" }}
                  component="span"
                  variant="body2"
                  color="text.primary"
                >
                  {msg.conversation}
                </Typography>
                {"  5min"}
              </React.Fragment>
            }
          />
        </ListItem>
        <Divider sx={{ my: 0.5 }} />
      </NavLink>
    );
  });
};

export default Messages;
