import React from "react";
import List from "@mui/material/List";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { CircularProgress } from "@mui/material";
import { CheckOutlined } from "@mui/icons-material";
import axios from "axios";

const PendingFriends = ({ myFriends, activeUser, search }) => {
  const confirmFriend = (e, friendId) => {
    e.preventDefault();
    axios
      .put("http://localhost:8081/confirm/" + friendId)
      .then(() => {
        console.log("Confirmed");
      })
      .catch((err) => {
        console.log(err);
      });
    return false;
  };
  return (
    <List sx={{ width: "100%", maxWidth: 400 }}>
      {myFriends.length > 0 &&
        myFriends
          .filter((resultat) => {
            const userInfo = resultat.userInfo;
            return (
              userInfo.username.includes(search) &&
              userInfo.id != activeUser.userId &&
              resultat.state == 1
            );
          })
          .map((resultat, index) => {
            const userInfo = resultat.userInfo;
            return (
              <NavLink
                to={"/chatApp/profile/" + userInfo.id}
                className="message"
                key={index}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={userInfo.username}
                      src={"http://localhost:8081/images/" + userInfo.images}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={userInfo.username}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline", overflow: "hidden" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          3k followers
                        </Typography>
                      </React.Fragment>
                    }
                  />
                  {resultat.to_id != activeUser.userId ? (
                    <CircularProgress />
                  ) : (
                    <CheckOutlined
                      onClick={(e) => confirmFriend(e, resultat.friendId)}
                    />
                  )}
                </ListItem>
                <Divider sx={{ my: 0.5 }} />
              </NavLink>
            );
          })}
    </List>
  );
};
export default PendingFriends;
