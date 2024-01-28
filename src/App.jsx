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

const Root = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8081/")
      .then((res) => {
        const data = res.data;
        if (!data.isLoggedIn) {
          navigate("/authentification/signIn");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);
  return (
    <div className="container">
      <NavBar />
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
        if (data.isLoggedIn) {
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
        element: <Chat />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "editprofil",
        element: <EditProfil />,
      },
      {
        path: "upload",
        element: <FileUpdate />,
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
