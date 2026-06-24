
import { Outlet } from "react-router-dom";
import Header from "../Components/Header/header";
import Footer from "../Components/Footer/Footer";

function UserLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default UserLayout;