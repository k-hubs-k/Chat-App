import {
  ChatBubbleOutlineOutlined,
  SettingsOutlined,
  LogoutOutlined,
  AccountCircleOutlined,
  QuestionAnswer,
  SearchRounded,
} from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const NavBar = ({socket}) => {
  const links = [
    { to: "/", component: <QuestionAnswer /> },
    { to: "chat", component: <ChatBubbleOutlineOutlined /> },
    { to: "search", component: <SearchRounded /> },
    { to: "settings", component: <SettingsOutlined /> },
    { to: "profile", component: <AccountCircleOutlined /> },
    { to: "Logout", component: <LogoutOutlined /> },
  ];

  const [imgPath, setImgPath] = useState("");
  const [Count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        const data = res.data;
        setImgPath("../../back/public/images/" + data.images);
      })
      .catch((err) => {
        console.log("error : ", err);
      });
  });
  
  return (
    <div className="navigation">
      <div className="mobile">
        <QuestionAnswer />
        <p className="title">Chat App</p>
      </div>
      <ul>
        {links.map((item, key) => {
          const badg = (e, n) => {
            if (key == 1) {
              return (
                <span className="icon">
                  <Badge badgeContent={n} color="secondary">
                    {e}
                  </Badge>
                </span>
              );
            } else {
              return <span className="icon">{e}</span>;
            }
          };
          return (
            <li key={key}>
              <NavLink to={item.to}>{badg(item.component, Count)}</NavLink>
            </li>
          );
        })}
        <li className="profile">
          <Avatar
            alt="Memy Sharp"
            src={imgPath}
            sx={{ width: 54, height: 54 }}
          />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
