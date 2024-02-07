import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

const Profile = ({socket}) => {
  const { id } = useParams();
  let userIdToFind = null;
  if (typeof id === "undefined") {
    userIdToFind = "/";
  } else {
    userIdToFind = "/" + id;
  }
  const url = "http://localhost:8081/profile" + userIdToFind;
  const [user, setuser] = useState([]);

  useLayoutEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setuser(res.data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(user);
  useEffect(() => {
    socket.emit("image", user.images)
  }, [id]);

  return (
    <div className="wrapper">
      {user ? (
        <>
          <div className="profil-top">
            <Avatar
              alt={user.username}
              src={"../../back/public/images/" + user.images}
              sx={{ width: "100%", height: "100%", marginBottom: "1rem" }}
              variant="square"
            />
            <NavLink to={"../upload"} className="profilImg">
              <Avatar
                alt={user.username}
                src={"../../back/public/images/" + user.images}
                sx={{ width: "100%", height: "100%", marginBottom: "1rem" }}
              />
            </NavLink>
          </div>
          <div className="profil-bottom">
            <div className="profil-info">
              <div className="main-info">
                <h3>{user.username}</h3>
                <p className="age grey">26</p>
              </div>
              <p className="email">{user.email}</p>
              <p className="ville">
                <FmdGoodOutlinedIcon /> Madagascar
              </p>
              <NavLink to={"../editprofil"} className="edit">
                <Button variant="contained">Edit</Button>
              </NavLink>
            </div>
            <div className="profil-stats">
              <div className="stats-item">
                <p className="stat">38k</p>
                <p className="grey">followers</p>
              </div>
              <div className="stats-item">
                <p className="stat">20k</p>
                <p className="grey">follow</p>
              </div>
              <div className="stats-item">
                <p className="stat">1.8k</p>
                <p className="grey">post</p>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Profile;
