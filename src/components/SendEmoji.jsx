import { useState, useEffect } from "react";
import TagFacesOutlinedIcon from "@mui/icons-material/TagFacesOutlined";
import Picker from "emoji-picker-react";

const SendEmoji = ({ setcontent }) => {
  useEffect(() => {
    document.querySelector(".toggs").style.display = "none";
  }, []);
  const [showEmojis, setShowEmojis] = useState(false);

  const handleShowEmojis = (e) => {
    console.log(e.target);
    setShowEmojis(!showEmojis);
    switch (!showEmojis) {
      case true:
        document.querySelector(".toggs").style.display = "block";
        break;
      case false:
        document.querySelector(".toggs").style.display = "none";
        break;
    }
  };
  return (
    <span>
      <div
        className="toggs"
        style={{
          position: "absolute",
          bottom: "100%",
          right: 0,
          display: "",
        }}
      >
        {showEmojis && (
          <Picker
            searchDisabled
            emojiStyle="facebook"
            previewConfig={{
              showPreview: false,
            }}
            onEmojiClick={(e) => {
              setcontent((message) => message + e.emoji);
            }}
          />
        )}
      </div>
      <TagFacesOutlinedIcon onClick={handleShowEmojis} className="tag" />
    </span>
  );
};

export default SendEmoji;
