import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import theme from "./theme";
import CartPage from "./Cart/Cart-Page";
import ErrorPage from "./Error/Error-Page";
import LoginPage from "./Login/Login-Page";
import HomePage from "./Homepage/Homepage";
import SignupPage from "./Signup/Signup-Page";
import ProductPage from "./Product/Product-Page";
import NavigationBar from "./Navigation-Bar/Navigation-Bar";
import { Flex, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

// fixed nav-bar component in all pages
const Layout = () => {
  return (
    <Flex direction={"column"} p="2vh 4vw" gap={"4vh"}>
      <NavigationBar />
      <Outlet />
    </Flex>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignupPage /> },
      { path: "/products/:id", element: <ProductPage /> },
    ],
    errorElement: <ErrorPage />,
  },
]);

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Notifications />
      <RouterProvider router={router} />
    </MantineProvider>
  );
};

export default App;
