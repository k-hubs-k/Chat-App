import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Check your password and try again");
    }

    // First of all, change serverUrl to the correct server url
    axios
      .post("http://localhost:8081/users", { username, email, password })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    console.log(username, email, password, confirm);
  };

  return (
    <form method="post" onSubmit={handleSubmit} className="login">
      <h1>Register</h1>
      <TextField
        className="field"
        id="outlined-basic"
        required
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        label="Username"
        variant="outlined"
      />
      <TextField
        className="field"
        id="outlined-basic"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        label="Email"
        variant="outlined"
      />
      <TextField
        className="field"
        id="outlined-basic"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        label="Password"
        variant="outlined"
      />
      <TextField
        className="field"
        id="outlined-basic"
        required
        onChange={(e) => setConfirm(e.target.value)}
        value={confirm}
        type="password"
        label="Confirm Password"
        variant="outlined"
      />
      <div className="otherActions">
        <a href="#">Aleready have account</a>
      </div>
      <Button type="submit" variant="contained">
        Register
      </Button>
    </form>
  );
};

export default SignUp;
