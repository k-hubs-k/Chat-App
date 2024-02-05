import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";

const Messages = ({ onOpenChat }) => {
  const [conversations, setConversations] = useState([]);
  const [proced, setProced] = useState(false);
  const handleClick = (_id) => {
    onOpenChat(_id);
  };
  const filterData = (data) => {
    if (proced) return;
    const seenIds = [];
    const chat = data.Conversations;
    const activeUser = data.active;
    let out = [];

    const uniqueData = chat.filter((item) => {
      const toCheck = item.from_id == activeUser ? item.to_id : item.from_id;
      if (seenIds.indexOf(toCheck) == -1) {
        seenIds.push(toCheck);
        return true;
      }
      return false;
    });
    for (let i = 0; i < uniqueData.length; i++) {
      const toCheck =
        uniqueData[i].from_id == activeUser
          ? uniqueData[i].to_id
          : uniqueData[i].from_id;

      getTargetInfo(toCheck, (err, res) => {
        if (!err) {
          out.push({
            user_id: res.id,
            username: res.username,
            email: res.email,
            conversation: uniqueData[i].content,
            images: res.images,
          });
          setConversations(out);
          if (i == uniqueData.length - 1) {
            setProced(true);
          }
        } else {
          console.log("err : ", err);
        }
      });
    }
  };

  useEffect(() => {
    axios.get("http://localhost:8081/conversation").then((res) => {
      filterData(res.data);
    });
  }, []);

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

  return conversations.map((msg) => {
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
