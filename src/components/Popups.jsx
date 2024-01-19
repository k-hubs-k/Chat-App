import Alert from "@mui/material/Alert";

const Popups = ({ type = "success", content = "hello world" }) => {
  return (
    <div className="popup">
      <Alert severity={type} className={`alert ${type}`}>
        {content}
      </Alert>
    </div>
  );
};

export default Popups;
