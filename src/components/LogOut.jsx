import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
const LogOut = () => {
  const navigate = useNavigate();
  const cancel = () => {
    navigate("/chatApp/chat");
  };
  const handleClick = () => {
    axios
      .post("http://localhost:8081/logout")
      .then((res) => {
        const data = res.data;
        if (data.Succes) {
          window.location.reload()
          // navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="LogOut">
      <h1>Log out</h1>
      <div className="actions">
        <Button variant="contained" onClick={handleClick}>
          Yes
        </Button>
        <Button variant="outlined" onClick={cancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default LogOut;
