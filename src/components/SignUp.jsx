import "../css/App.css";
import "../css/index.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import Popups from "./Popups";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const [popup, SetPopupMessage] = useState({
    type: "success",
    content: "hi",
    visible: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      SetPopupMessage({
        type: "warning",
        content: "Check your password and try again",
        visible: true,
      });
      return;
    }

    // First of all, change serverUrl to the correct server url
    axios
      .post("http://localhost:8081/users", { username, email, password })
      .then((res) => {
        const data = res.data;
        if (data.Succes) {
          SetPopupMessage({
            type: "success",
            content: "Registered succesfully... go to login page now...",
            visible: true,
          });
          setTimeout(() => {
            navigate("/chatApp/chat");
          }, 2000);
        } else if (data.Error) {
          SetPopupMessage({
            type: "error",
            content: "Error : " + data.Error,
            visible: true,
          });
        } else {
          SetPopupMessage({
            type: "warning",
            content: "Warning : " + data.Warning,
            visible: true,
          });
        }
      })
      .catch((err) => {
        SetPopupMessage({
          type: "error",
          content: "Error: " + err,
          visible: true,
        });
      });
  };

  return (
    <div className="container">
      {popup.visible && <Popups type={popup.type} content={popup.content} />}
      <form method="post" onSubmit={handleSubmit} className="login">
        <h1>Register</h1>
        <TextField
          className="field"
          required
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          label="Username"
          variant="outlined"
        />
        <TextField
          className="field"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          className="field"
          required
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          label="Password"
          variant="outlined"
        />
        <TextField
          className="field"
          required
          onChange={(e) => setConfirm(e.target.value)}
          value={confirm}
          type="password"
          label="Confirm Password"
          variant="outlined"
        />
        <div className="otherActions">
          <NavLink to="/authentification/signIn">Aleready have account</NavLink>
        </div>
        <Button type="submit" variant="contained">
          Register
        </Button>
      </form>
    </div>
  );
};

export default SignUp;
