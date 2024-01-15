import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Chat from "./components/Chat";
import Settings from "./components/Settings";
import Search from "./components/Search";
import Profile from "./components/Profile";
import LogOut from "./components/LogOut";
import MainMenu from "./components/MainMenu";

const Root = () => {
  return (
    <div className="container">
      <NavBar />
      <Outlet />
    </div>
  );
};

const WelcomePage = () => {
  return (
    <>
      <MainMenu />
      <Outlet />
    </>
  );
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
        path: "logout",
        element: <LogOut />,
      },
    ],
  },
  {
    path: "authentification",
    element: <Outlet />,
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
