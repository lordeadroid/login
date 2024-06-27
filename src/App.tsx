import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import NavigationBar from "./Navigation-Bar/Navigation-Bar";
import SignupPage from "./Signup/Signup-Page";
import { TReact } from "./types";
import LoginPage from "./Login/Login-Page";
import HomePage from "./Homepage/Homepage";
import ProductPage from "./Product/Product-Page";
import ErrorPage from "./Error/Error-Page";

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
      { path: "/products/:id", element: <ProductPage /> },
    ],
    errorElement: <ErrorPage />,
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
