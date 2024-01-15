import { NavLink } from "react-router-dom";

const MainMenu = () => {
  return (
    <div className="mainMenu">
      <h1>Welcome here</h1>
      <p>Start chat with friend and the world :p</p>
      <NavLink to="authentification/signIn">Login here</NavLink>
    </div>
  );
};

export default MainMenu
