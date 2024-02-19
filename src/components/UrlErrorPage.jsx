import ErrorOutlined from "@mui/icons-material/ErrorOutlined";
import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
const UrlErrorPage = () => {
  return (
    <div className="urlError">
      <div className="icon">
        <ErrorOutlined />
        <h2>Something went wrong</h2>
        <p className="desc">Try again later...</p>
      </div>
      <NavLink to={"/"}>
        <Button variant="contained">Go back</Button>
      </NavLink>
    </div>
  );
};

export default UrlErrorPage;
