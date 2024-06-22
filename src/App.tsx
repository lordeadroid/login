import "@mantine/core/styles.css";
import "./App.css";
import { MantineProvider } from "@mantine/core";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavigationBar from "./Navigation-Bar/Navigation-Bar";
import Page from "./Page";

const Layout = (): React.JSX.Element => {
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
    children: [{ path: "/", element: <Page /> }],
  },
]);

const App = (): React.JSX.Element => {
  return (
    <MantineProvider>
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
