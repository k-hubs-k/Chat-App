import React, { useEffect, useState } from "react";
import SendOutlined from "@mui/icons-material/SendOutlined";
import SendEmoji from "./SendEmoji";
import axios from "axios";

const Send = ({socket, target_id}) => {
    const [content, setcontent] = useState("");

    const handleTyping = () =>
        socket.emit('typing', `${localStorage.getItem('userName')} is typing`);

    const hundleSubmit = (e) => {
        e.preventDefault();
        const date1 = new Date()
        axios
          .post("http://localhost:8081/send", {target_id, content, date1})
          .then((res) => {
            console.log(res);
          })
          .catch(() => {
            console.log("Unable to load this conversation");
          });

        if (content.trim()) {
            socket.emit('message', {target_id, content, date1});
        }
        setcontent('');
    }

    return (
        <form className="type" onSubmit={hundleSubmit}>
            <input
            type="text"
            placeholder="Message"
            value={content}
            onChange={(e) => {
                setcontent(e.target.value);
            }}
            />
            <SendEmoji setcontent={setcontent} />
            <SendOutlined onClick={hundleSubmit} sx={{ cursor: "pointer"}} />
        </form>
    );
};

export default Send;