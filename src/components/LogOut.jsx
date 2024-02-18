import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Loading from "./Loading";

axios.defaults.withCredentials = true;
const LogOut = () => {
  const [isWaiting, setIsWaiting] = useState(false);
  const navigate = useNavigate();
  const cancel = () => {
    navigate("/chatApp/chat");
  };
  const handleClick = () => {
    setIsWaiting(true);
    axios
      .post("http://localhost:8081/logout")
      .then((res) => {
        const data = res.data;
        if (data.Succes) {
          navigate("/");
        }
        setIsWaiting(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="LogOut">
      {isWaiting ? (
        <Loading />
      ) : (
        <>
          <h1>Log out</h1>
          <div className="actions">
            <Button variant="contained" onClick={handleClick}>
              Yes
            </Button>
            <Button variant="outlined" onClick={cancel}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default LogOut;
