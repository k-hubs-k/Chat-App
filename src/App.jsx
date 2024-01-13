import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

const Root = () => {
  return (
    <div className="container">
      <NavBar />
      <Outlet />
    </div>
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
        element: <Home />,
      },
      {
        path: "search",
        element: <Home />,
      },
      {
        path: "settings",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Home />,
      },
      {
        path: "logout",
        element: <Home />,
      },
    ],
  },
  {
    path: "/",
    element: <Outlet />,
    children: [
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
    ],
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
