import React from "react";
import List from "@mui/material/List";
import { NavLink } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import AddFriend from "./AddFriend";
const AnotherPeople = ({
  data,
  search,
  activeUser,
  myFriends,
  onRedoFetch,
}) => {
  const filterPerson = (person) => {
    /*
     * @person: object {id, username, email, images}
     * @myFriends: array object {id, username, email, images}
     */
    let out = true;
    if (!person.username.includes(search)) {
      out = false;
    }
    if (person.id == activeUser.userId) {
      out = false;
    }
    if (myFriends.length > 0)
      myFriends.map((friend) => {
        if (person.id == friend.id) {
          out = false;
        }
      });
    if (myFriends.state == 0) {
      out = false;
    }
    return out;
  };
  return (
    <List sx={{ width: "100%", maxWidth: 400 }}>
      {data.length > 0 &&
        data
          .filter((resultat) => {
            return filterPerson(resultat);
          })
          .map((resultat, index) => {
            return (
              <NavLink
                to={"/chatApp/profile/" + resultat.id}
                className="message"
                key={index}
              >
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar
                      alt={resultat.username}
                      src={"http://localhost:8081/images/" + resultat.images}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={resultat.username}
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
                  <AddFriend target={resultat.id} onAddFriend={onRedoFetch} />
                </ListItem>
                <Divider sx={{ my: 0.5 }} />
              </NavLink>
            );
          })}
    </List>
  );
};

export default AnotherPeople;
