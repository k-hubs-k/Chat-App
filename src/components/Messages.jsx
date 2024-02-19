import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import axios from "axios";

/**
 * @param {Function} onOpenChat
 * @param {Function} onChangePage
 */

const Messages = ({ onOpenChat, socket, lastMessageRef, onChangePage }) => {
  const [users, setUsers] = useState([]);
  const [proced, setProced] = useState(false);
  const [activeUser, setActiveUser] = useState({});

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
            from_id: uniqueData[i].from_id,
            images: res.images,
            seen: uniqueData[i].seen,
          });
          setUsers(out);
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
    axios.get("http://localhost:8081/profile/").then((res) => {
      setActiveUser(res.data.user);
    });
  }, [socket, users]);

  useEffect(() => {
    socket.on("messageResponse", () => {
      axios.get("http://localhost:8081/conversation").then((res) => {
        filterData(res.data);
      });
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

  const handleClick = (_id) => {
    onOpenChat(_id);
    onChangePage(true);
  };

  return users.map((msg) => {
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
                  className={
                    msg.from_id != activeUser.id ? (msg.seen ? "" : "bold") : ""
                  }
                >
                  {msg.from_id == activeUser.id ? "you: " : msg.username + ": "}
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
