import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios from "axios";
// import ico from "../assets/41gYkruZM2L.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { NavLink } from "react-router-dom";
import { green } from "@mui/material/colors";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Search = ({ socket }) => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [activeUser, setActiveUser] = useState([]);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  useEffect(() => {
    if (!loading)
      axios.get("http://localhost:8081/").then((res) => {
        setActiveUser(res.data);
      });
  }, []);

  React.useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = () => {
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:8081/all")
      .then((res) => {
        setData(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const hundleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  return (
    <>
      <form className="searchBar">
        <TextField
          className="searchbar"
          required
          value={search}
          onChange={hundleSearch}
          label="Search"
          variant="outlined"
        />
        {/* <img src={ico} alt="search icon" className="searchBtn" /> */}
      </form>
      <List sx={{ width: "100%", maxWidth: 400 }}>
        {data
          .filter((resultat) => {
            return (
              resultat.username.includes(search) &&
              resultat.id != activeUser.userId
            );
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
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ m: 1, position: "relative" }}>
                      <div onClick={handleButtonClick}>
                        {success ? <CheckIcon /> : <PersonAddOutlinedIcon />}
                      </div>
                      {loading && (
                        <CircularProgress
                          size={38}
                          sx={{
                            color: green[500],
                            position: "absolute",
                            top: -6,
                            left: -6,
                            zIndex: 1,
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                </ListItem>
                <Divider sx={{ my: 0.5 }} />
              </NavLink>
            );
          })}
      </List>
    </>
  );
};

export default Search;
