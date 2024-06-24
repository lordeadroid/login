import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavigationBar from "./Navigation-Bar/Navigation-Bar";
import Page from "./Page";
import SignupPage from "./Signup/Signup-Page";
import { TReact } from "./types";
import Login from "./Login/Login";

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
      { path: "/", element: <Page /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/login", element: <Login /> },
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
