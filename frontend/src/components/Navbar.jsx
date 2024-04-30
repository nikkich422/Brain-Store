import React, { useState } from "react";
import img from "../../public/brain-store.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserLogin } from "../Utils/dataSlice";
import { useToast } from "@chakra-ui/react";
import DrawerNav from "./DrawerNav";

const Navbar = () => {
  const toast = useToast();
  const cartData = useSelector((store) => store.cart.cartItems);
  const userLogged = useSelector((store) => store.data.userLogin);
  const dispatch = useDispatch();
  const [menuBtn, setMenuBtn] = useState(true);

  const handleLogOut = () => {
    dispatch(setUserLogin());
    toast({
      title: "User",
      description: "User Log out successfully..",
      status: "warning",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <nav className="w-full">
      <div className=" flex justify-around bg-gradient-to-r from-violet-500 to-fuchsia-500 h-16 items-center ">
        <span className="inline-block md:hidden">
          <DrawerNav />
        </span>
        <Link to="/">
          <img className="h-6" src={img} alt="logo-img" />
        </Link>
        <ul className="md:flex justify-evenly gap-10 items-center hidden">
          <Link to="/">
            <li className="font-bold text-xl">Home</li>
          </Link>
          <Link to="contact">
            <li className="font-bold text-xl">Contact</li>
          </Link>
          <Link to="/about">
            <li className="font-bold text-xl">About</li>
          </Link>
          <Link to="/cart">
            <li className="font-bold text-xl">
              Cart {cartData.length > 0 && <span>({cartData.length})</span>}
            </li>
          </Link>
        </ul>

        {userLogged ? (
          <button
            onClick={handleLogOut}
            className="px-4 py-2 mx-1 md:mx-4 my-2 bg-green-500 rounded-2xl text-white font-semibold"
          >
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button className="px-4 py-2 mx-1 md:mx-4 my-2 bg-green-500 rounded-2xl text-white font-semibold">
              Log in
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
