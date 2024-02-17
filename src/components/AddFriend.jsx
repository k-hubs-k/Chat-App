import Box from "@mui/material/Box";
import CheckIcon from "@mui/icons-material/Check";
import CircularProgress from "@mui/material/CircularProgress";
import { green } from "@mui/material/colors";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const AddFriend = ({ target, onAddFriend }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleButtonClick = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8081/addFriend/" + target)
      .then(() => {
        onAddFriend();
      })
      .catch((err) => {
        console.log(err);
      });

    // Animations
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = window.setTimeout(() => {
        setSuccess(true);
        setLoading(false);
      }, 2000);
    }
    return false;
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ m: 1, position: "relative" }}>
        <div onClick={handleButtonClick}>
          {success ? <CheckIcon /> : <PersonAddOutlinedIcon />}
        </div>
        {loading && (
          <CircularProgress
            size={38}
            sx={{
              color: green[500],
              position: "absolute",
              top: -6,
              left: -6,
              zIndex: 1,
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default AddFriend;
