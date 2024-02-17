import { Suspense, lazy, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";

const SignIn = lazy(() => import("./pages/SignIn"));
const SignUp = lazy(() => import("./pages/SignUp"));
const Home = lazy(() => import("./pages/Home"));
const NavBar = lazy(() => import("./components/NavBar"));
const FileUpdate = lazy(() => import("./FileUpload"));
const Chat = lazy(() => import("./pages/Chat"));
const Settings = lazy(() => import("./pages/Settings"));
const Search = lazy(() => import("./pages/Search"));
const Profile = lazy(() => import("./pages/Profile"));
const EditProfil = lazy(() => import("./components/EditProfil"));
const MainMenu = lazy(() => import("./pages/MainMenu"));
const LogOut = lazy(() => import("./components/LogOut"));

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
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "chat",
        element: (
          <Suspense>
            <Chat socket={socket} />
          </Suspense>
        ),
        children: [
          {
            path: ":id",
            element: (
              <Suspense>
                <Chat socket={socket} />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "settings",
        element: (
          <Suspense>
            <Settings />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense>
            <Search socket={socket} />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense>
            <Profile socket={socket} />
          </Suspense>
        ),
        children: [
          {
            path: ":id",
            element: (
              <Suspense>
                <Profile socket={socket} />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "editprofil",
        element: (
          <Suspense>
            <EditProfil socket={socket} />
          </Suspense>
        ),
      },
      {
        path: "upload",
        element: (
          <Suspense>
            <FileUpdate socket={socket} />
          </Suspense>
        ),
      },
      {
        path: "logout",
        element: (
          <Suspense>
            <LogOut />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "authentification",
    element: <AuthentificationPage />,
    children: [
      {
        path: "signIn",
        element: (
          <Suspense>
            <SignIn />
          </Suspense>
        ),
      },
      {
        path: "signUp",
        element: (
          <Suspense>
            <SignUp />
          </Suspense>
        ),
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
