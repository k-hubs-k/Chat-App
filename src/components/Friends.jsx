import React from "react";
import List from "@mui/material/List";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import axios from "axios";

const Friends = ({ myFriends, activeUser }) => {
  return (
    <List sx={{ width: "100%", maxWidth: 400 }}>
      {myFriends.length &&
        myFriends
          .filter((resultat) => {
            return resultat.state == 0;
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
                      alt={resultat.username}
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
                  {/* <CircularProgressWithLabel /> */}
                </ListItem>
                <Divider sx={{ my: 0.5 }} />
              </NavLink>
            );
          })}
    </List>
  );
};
export default Friends;
