import { NavLink } from "react-router-dom";
import SendOutlined from "@mui/icons-material/SendOutlined";
import MenuRounded from "@mui/icons-material/MenuRounded";

const Chat = () => {
  return (
    <div className="chat">
      <div className="messages active">
        <div className="searchBox">
          <input type="text" placeholder="Search" />
        </div>
        <ul className="availableChat">
          <NavLink to={"#misterTester"} className="message">
            <li>
              <div className="profile">
                <img src="../../back/public/images/user-default.png" />
              </div>
              <div className="content">
                <p className="username">Mister tester</p>
                <p className="content">Hello I'm the test</p>
              </div>
            </li>
          </NavLink>
          <NavLink to={""} className="message">
            <li>
              <div className="profile">
                <img src="../../back/public/images/user-default.png" />
              </div>
              <div className="content">
                <p className="username">Mister tester</p>
                <p className="content">Hello I'm the test</p>
              </div>
            </li>
          </NavLink>
          <NavLink to={""} className="message">
            <li>
              <div className="profile">
                <img src="../../back/public/images/user-default.png" />
              </div>
              <div className="content">
                <p className="username">Mister tester</p>
                <p className="content">Hello I'm the test</p>
              </div>
            </li>
          </NavLink>
          <NavLink to={""} className="message">
            <li>
              <div className="profile">
                <img src="../../back/public/images/user-default.png" />
              </div>
              <div className="content">
                <p className="username">Mister tester</p>
                <p className="content">Hello I'm the test</p>
              </div>
            </li>
          </NavLink>
          <NavLink to={""} className="message">
            <li>
              <div className="profile">
                <img src="../../back/public/images/user-default.png" />
              </div>
              <div className="content">
                <p className="username">Mister tester</p>
                <p className="content">Hello I'm the test</p>
              </div>
            </li>
          </NavLink>
          <NavLink to={""} className="message">
            <li>
              <div className="profile">
                <img src="../../back/public/images/user-default.png" />
              </div>
              <div className="content">
                <p className="username">hubs Mister tester</p>
                <p className="content">Hello I'm the test</p>
              </div>
            </li>
          </NavLink>
        </ul>
      </div>
      <div className="read">
        <div className="userInfo">
          <div className="profile">
            <img src="../../back/public/images/user-default.png" />
          </div>
          <p className="name">Mister tester</p>
          <a href="#">
            <MenuRounded />
          </a>
        </div>
        <div className="chatArea">
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg you">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint
            cillum sint consectetur cupidatat.
          </div>
          <div className="msg me">
            hubs is here Lorem ipsum dolor sit amet, qui minim labore
            adipisicing minim sint cillum sint consectetur cupidatat.
          </div>
        </div>
        <div className="type">
          <input type="text" placeholder="Message" />
          <a href="#">
            <SendOutlined />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Chat;
