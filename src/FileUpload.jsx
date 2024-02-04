import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

function FileUpdate() {
  const [file, setFile] = useState();
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const hundlUpload = () => {
    const formdata = new FormData();
    formdata.append("image", file);
    axios
      .post("http://localhost:8081/upload", formdata, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        if (res.data.Status === "Succes") {
          console.log("succes");
          navigate("/chatApp/profile");
        } else {
          console.log("failed");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <Avatar
          alt={data.username}
          src={"../back/public/images/" + data.images}
          sx={{ width: 400, height: 400, marginBottom: "1rem" }}
          variant="square"
        />
        <input
          filename={file}
          type="file"
          onChange={(e) => {
            setFile(e.target.files[0]);
            console.log(e);
          }}
          accept="image/*"
          required
        />
        <Button
          variant="outlined"
          type="submit"
          onClick={hundlUpload}
          style={{ marginTop: "1rem" }}
        >
          upload
        </Button>
      </div>
      <br />
    </>
  );
}

export default FileUpdate;
