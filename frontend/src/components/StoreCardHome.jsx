import React from "react";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { Link } from "react-router-dom";
import { addItem } from "../Utils/cartSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

const StoreCardHome = ({ data }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { title, thumbnail, price, discountPercentage, id } = data;

  function handleAddToCart() {
    console.log(data);
    toast({
      title: "Cart",
      description: "Item added to cart successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
    dispatch(addItem(data));
  }

  return (
    <div className="md:w-60 w-40 bg-white p-2 hover:shadow-md rounded-md">
      <Link key={id} to={`/product/${id}`}>
        <div>
          <div className="h-36 md:h-[200px] flex justify-center">
            <img className="p-2 " src={thumbnail} alt={title} />
          </div>
          <h1 className="pl-1 md:pl-2">{title}</h1>
          <div className="flex gap-3 md:gap-5 justify-center md:flex-nowrap flex-wrap">
            <span className="line-through ">
              ₹{(price + price / discountPercentage).toFixed(0)}
            </span>
            <span className="font-bold">₹{price}</span>
            <span className="text-green-600 font-bold">
              {discountPercentage}% off
            </span>
          </div>
        </div>
      </Link>
      <button
        className="font-bold bg-yellow-400 w-full py-1 rounded-sm flex justify-center items-center gap-4 my-2 z-10"
        onClick={(e) => handleAddToCart(e)}
      >
        Add To Cart
      </button>
      <Link to="/cart">
        <button className="font-bold bg-blue-500 w-full py-1 rounded-sm flex justify-center items-center gap-4 my-2 z-10 text-white">
          View Cart
          <ArrowRightAltOutlinedIcon />
        </button>
      </Link>
    </div>
  );
};

export default StoreCardHome;
