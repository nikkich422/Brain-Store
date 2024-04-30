import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useDispatch, useSelector } from "react-redux";
import { deleteOne } from "../Utils/cartSlice";
import { useToast } from "@chakra-ui/react";

const CartCard = ({ item }) => {
  const toast = useToast();
  const cartData = useSelector((store) => store?.cart?.cartItems);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    // console.log(id);
    const filterCartData = cartData.filter((item) => item.id != id);

    dispatch(deleteOne(filterCartData));
    toast({
      title: "Cart",
      description: "Item removed from cart successfully",
      status: "warning",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <div
      key={item.asin}
      className="flex justify-center items-center w-11/12 md:w-2/3 "
    >
      <div className="flex justify-center items-center w-full bg-gray-100 rounded-lg">
        <div className="w-3/6">
          <h1 className="font-bold my-2">{item.title}</h1>
          <p>₹{item.price}</p>
        </div>
        <div className=" w-2/6 flex justify-center items-center">
          <img className="w-24 p-2" src={item.thumbnail} alt={item.id} />
        </div>
      </div>
      <div
        className="mx-4 hover:cursor-pointer"
        onClick={() => handleDelete(item.id)}
      >
        <CloseOutlinedIcon />
      </div>
    </div>
  );
};

export default CartCard;
