import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavigationBar from "./Navigation-Bar/Navigation-Bar";
import SignupPage from "./Signup/Signup-Page";
import { TReact } from "./types";
import LoginPage from "./Login/Login-Page";
import HomePage from "./Homepage/Homepage";

// fixed nav-bar component in all pages
const Layout: TReact = () => {
  return (
    <>
      <NavigationBar />
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

const App: TReact = () => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
