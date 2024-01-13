import {
  ChatBubbleOutlineOutlined,
  SettingsOutlined,
  LogoutOutlined,
  AccountCircleOutlined,
  QuestionAnswer,
  SearchRounded,
  ArrowForwardIosOutlined,
  ArrowBackIosNewOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const NavBar = () => {
  const links = [
    { name: "Chat App", to: "/", component: <QuestionAnswer /> },
    { name: "Chat", to: "chat", component: <ChatBubbleOutlineOutlined /> },
    { name: "Search", to: "search", component: <SearchRounded /> },
    { name: "Settings", to: "settings", component: <SettingsOutlined /> },
    { name: "Profile", to: "profile", component: <AccountCircleOutlined /> },
    { name: "Logout", to: "Logout", component: <LogoutOutlined /> },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`navigation ${isOpen ? "open" : ""} `}>
      <ul>
        {links.map((item, key) => {
          return (
            <li key={key}>
              <NavLink to={item.to}>
                <span className="icon">{item.component}</span>
                <span className="title">{item.name}</span>
              </NavLink>
            </li>
          );
        })}
      </ul>
      <button className="toggle" onClick={toggle}>
        {!isOpen ? <ArrowForwardIosOutlined /> : <ArrowBackIosNewOutlined />}
      </button>
    </div>
  );
};

export default NavBar;
