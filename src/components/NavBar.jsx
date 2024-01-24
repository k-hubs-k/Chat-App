import {
  ChatBubbleOutlineOutlined,
  SettingsOutlined,
  LogoutOutlined,
  AccountCircleOutlined,
  QuestionAnswer,
  SearchRounded,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const links = [
    { to: "/", component: <QuestionAnswer /> },
    { to: "chat", component: <ChatBubbleOutlineOutlined /> },
    { to: "search", component: <SearchRounded /> },
    { to: "settings", component: <SettingsOutlined /> },
    { to: "profile", component: <AccountCircleOutlined /> },
    { to: "Logout", component: <LogoutOutlined /> },
  ];

  const [imgPath, setImgPath] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        const data = res.data;
        setImgPath("../../back/public/images/" + data.img);
        console.log(imgPath);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  }, []);
  return (
    <div className="navigation">
      <div className="mobile">
        <QuestionAnswer />
        <p className="title">Chat App</p>
      </div>
      <ul>
        {links.map((item, key) => {
          return (
            <li key={key}>
              <NavLink to={item.to}>
                <span className="icon">{item.component}</span>
              </NavLink>
            </li>
          );
        })}
        <li className="profile">
          <NavLink to="profile" aria-disabled>
            <span className="icon">
              <img src={imgPath} />
            </span>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
