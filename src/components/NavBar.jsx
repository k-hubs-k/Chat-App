import {
  ChatBubbleOutlineOutlined,
  SettingsOutlined,
  LogoutOutlined,
  AccountCircleOutlined,
  QuestionAnswer,
  SearchRounded,
  ArrowLeft,
} from "@mui/icons-material";

const NavBar = () => {
  const links = [
    { name: "Chat App", to: "#", component: <QuestionAnswer /> },
    { name: "Chat", to: "chat", component: <ChatBubbleOutlineOutlined /> },
    { name: "Search", to: "search", component: <SearchRounded /> },
    { name: "Settings", to: "settings", component: <SettingsOutlined /> },
    { name: "Profile", to: "profile", component: <AccountCircleOutlined /> },
    { name: "Logout", to: "Logout", component: <LogoutOutlined /> },
  ];
  return (
    <div className="container">
      <div className="navigation">
        <ul>
          {links.map((item, key) => {
            return (
              <li key={key}>
                <a href="#">
                  <span className="icon">{item.component}</span>
                  <span className="title">{item.name}</span>
                </a>
              </li>
            );
          })}
          <li className="toggle">
            <span className="icon">
              <ArrowLeft />
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
