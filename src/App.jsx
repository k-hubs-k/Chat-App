import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import FileUpdate from "./FileUpload";

import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import Chat from "./pages/Chat";
import Settings from "./pages/Settings";
import Search from "./pages/Search";
import Profile from "./pages/Profile";
import EditProfil from "./components/EditProfil";
import LogOut from "./components/LogOut";
import MainMenu from "./pages/MainMenu";

import { useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://localhost:8081");

const Root = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        const data = res.data;
        if (!data.userId) {
          navigate("/authentification/signIn");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);
  return (
    <div className="container">
      <NavBar socket={socket} />
      <Outlet />
    </div>
  );
};

const WelcomePage = () => {
  axios.defaults.withCredentials = true;
  return (
    <>
      <MainMenu />
      <Outlet />
    </>
  );
};

axios.defaults.withCredentials = true;
const AuthentificationPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        const data = res.data;
        if (data.userId) {
          navigate("/chatApp/chat");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);
  return <Outlet />;
};

const router = createBrowserRouter([
  {
    path: "chatApp",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "chat",
        element: <Chat socket={socket} />,
        children: [
          {
            path: ":id",
            element: <Chat socket={socket} />,
          },
        ],
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "search",
        element: <Search socket={socket} />,
      },
      {
        path: "profile",
        element: <Profile socket={socket} />,
        children: [
          {
            path: ":id",
            element: <Profile socket={socket} />,
          },
        ],
      },
      {
        path: "editprofil",
        element: <EditProfil socket={socket} />,
      },
      {
        path: "upload",
        element: <FileUpdate socket={socket} />,
      },
      {
        path: "logout",
        element: <LogOut />,
      },
    ],
  },
  {
    path: "authentification",
    element: <AuthentificationPage />,
    children: [
      {
        path: "signIn",
        element: <SignIn />,
      },
      {
        path: "signUp",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/",
    element: <WelcomePage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
