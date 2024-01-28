import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

// Popup
import { toast, ToastContainer } from "react-toastify";
import popupOptions from "../utils/toastOptions";

// CSS
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      toast.error("Password and confirm must be same.", popupOptions);
      return;
    }

    // First of all, change serverUrl to the correct server url
    axios
      .post("http://localhost:8081/users", { username, email, password })
      .then((res) => {
        const data = res.data;
        if (data.Succes) {
          toast.success(
            "Registered succesfully... go to login now...",
            popupOptions,
          );
          setTimeout(() => {
            navigate("/");
          }, 2000);
        } else if (data.Error) {
          toast.error("Error : " + data.Error, popupOptions);
        } else {
          toast.warning("Error : " + data.Warning, popupOptions);
        }
      })
      .catch((err) => {
        toast.error("Error : " + err, popupOptions);
      });
  };

  return (
    <div className="container">
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
      <ToastContainer />
    </div>
  );
};

export default SignUp;
