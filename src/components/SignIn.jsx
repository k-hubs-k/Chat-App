import "../css/App.css";
import "../css/index.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // First of all, change serverUrl to the correct server url
    axios
      .post("serverUrl", { username, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <form method="post" onSubmit={() => handleSubmit} className="login">
        <h1>Welcome back</h1>
        <TextField
          className="field"
          id="outlined-basic"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="Username"
          variant="outlined"
        />
        <TextField
          className="field"
          id="outlined-basic"
          required
          value={password}
          onChange={(e) => setPassord(e.target.value)}
          type="password"
          label="Password"
          variant="outlined"
        />
        <div className="otherActions">
          <a href="#">Do not have account</a>
          <a href="#">Forgot Password</a>
        </div>
        <Button variant="contained" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default SignIn;
