import "../css/App.css";
import "../css/index.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;
const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassord] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // First of all, change serverUrl to the correct server url
    axios
      .post("http://localhost:8081/login", { username, password })
      .then((res) => {
        const response = res.data;
        if (response.Succes) navigate("/chatApp/chat");
        if (response.Error) alert(response.Error);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="login">
        <h1>Welcome back</h1>
        <TextField
          className="field"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          variant="outlined"
        />
        <TextField
          className="field"
          required
          value={password}
          onChange={(e) => setPassord(e.target.value)}
          type="password"
          label="Password"
          variant="outlined"
        />
        <div className="otherActions">
          <NavLink to="/authentification/signUp">Do not have account</NavLink>
          <NavLink>Forgot Password</NavLink>
        </div>
        <Button variant="contained" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
