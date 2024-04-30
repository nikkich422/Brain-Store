import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartCard from "./CartCard";
import { deleteAll } from "../Utils/cartSlice";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import LoadingBar from "react-top-loading-bar";

const Cart = () => {
  const toast = useToast();
  const cartData = useSelector((store) => store?.cart?.cartItems);
  const dispatch = useDispatch();
  const totalSum =
    cartData.length > 0
      ? cartData.reduce(
          (acc, item) => parseFloat(parseFloat(acc) + parseFloat(item.price)),
          0
        )
      : 0;
  const total = totalSum.toFixed(2);
  // console.log(total);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    setProgress(progress + 10);
    setTimeout(() => {
      setProgress(progress + 20);
    }, 1000);
    setTimeout(() => {
      setProgress(100);
    }, 2000);
  }, []);

  const handleDeleteAll = () => {
    dispatch(deleteAll());
    toast({
      title: "Cart",
      description: "All items removed from cart successfully",
      status: "error",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <div className="flex gap-2 flex-col items-center mt-2 md:mt-10">
      <LoadingBar
        color="#7DF9FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      {cartData.length == 0 ? (
        <>
          <h1 className="text-red-600 font-bold text-xl">Cart is empty!!</h1>
          <Link to="/">
            <p className="text-blue-600 hover:underline">
              Start shopping and Add items to cart
            </p>
          </Link>
        </>
      ) : (
        <button
          className="m-2 p-2 bg-red-500 text-white rounded-lg "
          onClick={handleDeleteAll}
        >
          Remove All
        </button>
      )}
      {cartData.map((item) => (
        <CartCard key={item.id} item={item} />
      ))}
      {cartData.length > 0 && (
        <>
          <div className="w-11/12 md:w-8/12 mt-5 p-2 mx-auto border border-gray rounded-xl flex flex-col gap-3">
            <h1 className="font-bold text-2xl p-2 px-4">Order Summary</h1>
            <div className="flex justify-between px-4 md:px-8 text-gray-500">
              <p>Total items</p> {cartData.length}
            </div>
            <div className="flex justify-between px-4 md:px-8 text-gray-500">
              <p>Subtotal</p> ₹ {total}
            </div>
            <div className="flex justify-between px-4 md:px-8 text-gray-500">
              <p>Coupon Code</p> Not Applicable{" "}
            </div>
            <div className="flex justify-between px-4 md:px-8 font-semibold">
              <p>Total</p> ₹ {total}
            </div>
            <Link to="/checkout">
              <button className="p-2 m-4 rounded-lg bg-blue-600 text-white w-36 ">
                Checkout{" "}
                <span>
                  <ArrowRightAltOutlinedIcon />
                </span>
              </button>
            </Link>
          </div>
          <p className=" m-2 mb-10">
            or{" "}
            <Link to="/">
              <span className="text-blue-500 hover:underline">
                Continue shopping
              </span>
            </Link>
          </p>
        </>
      )}
      {cartData.length == 0 && <div className="h-screen w-full"></div>}
    </div>
  );
};

export default Cart;
