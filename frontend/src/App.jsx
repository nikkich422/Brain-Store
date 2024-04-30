import Navbar from "./components/Navbar";
import "./App.css";
import "./index.css";
import Contact from "./components/Contact";
import HomePage from "./components/HomePage";
import About from "./components/About";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Cart from "./components/Cart";
import Error from "./components/Error";
import ReactDOM from "react-dom/client";
import React from "react";
import ProductBrowse from "./components/ProductBrowse";
import appStore from "./Utils/appStore";
import { Provider } from "react-redux";
import Footer from "./components/Footer";
import CheckoutPage from "./components/CheckoutPage";
import SuccessOrder from "./components/SuccessOrder";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./components/LoginPage";
import Register from "./components/Register";
import Fetch from "./components/Fetch";
import Post from "./components/Post";
import LoginOtp from "./components/LoginOtp";
import DrawerNav from "./components/DrawerNav";

function App() {
  return (
    <div>
      <ChakraProvider>
        <Provider store={appStore}>
          <Navbar />
          <Outlet />
          <Footer />
        </Provider>
      </ChakraProvider>
    </div>
  );
}

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:asin",
        element: <ProductBrowse />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/ordersuccessful",
        element: <SuccessOrder />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/fetch",
        element: <Fetch />,
      },
      {
        path: "/post",
        element: <Post />,
      },
      {
        path: "/loginwithotp",
        element: <LoginOtp />,
      },
      {
        path: "/drawer",
        element: <DrawerNav />,
      },
    ],
    errorElement: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={appRouter} />
);
