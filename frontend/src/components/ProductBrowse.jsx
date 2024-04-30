import React, { useEffect, useState } from "react";
import LoadingBar from "react-top-loading-bar";
import { Link, useParams } from "react-router-dom";
import { products } from "../Utils/constants";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { Carousel } from "antd";
import { addItem } from "../Utils/cartSlice";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";

const ProductBrowse = () => {
  const productId = useParams();
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    setProgress(progress + 10);
    setTimeout(() => {
      setProgress(progress + 20);
    }, 1000);
    setTimeout(() => {
      setProgress(100);
    }, 2000);
  }, []);
  console.log(productId.asin);
  console.log(products);
  const data = products.filter((p) => p.id == productId.asin);
  console.log(data[0]);

  const { images, title, stock, description, brand, price, category } = data[0];

  const handleAddToCart = () => {
    dispatch(addItem(data[0]));
    toast({
      title: "Cart",
      description: "Item added to cart successfully",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <LoadingBar
        color="#7DF9FF"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <div className="flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-2 md:gap-16 h-[90vh] md:h-[60vh]">
        <div className="ml-4 md:ml-32 w-56 h-64 bg-gray-200 my-5">
          <Carousel
            autoplay
            autoplaySpeed={1500}
            className=" h-64 flex justify-center items-center bg-blue-200"
          >
            {images.map((i, index) => (
              <div className="h-64 ">
                <img
                  className="h-full w-full"
                  key={index}
                  src={i}
                  alt={index}
                />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="flex flex-col gap-4 w-11/12 md:w-1/2 px-4 md:px-0 ">
          <h1 className="font-bold text-4xl">{title}</h1>
          <h1 className="text-semibold text-3xl">₹{price}</h1>
          <p className="text-gray-500 w-11/12 md:w-1/2">{description}</p>
          <h1 className="">Mega discount given by {brand}.</h1>
        </div>
      </div>
      <div className="flex w-full mb-5 md:flex-row flex-col border-gray-300 border-t-0 md:border-t pt-5 m-0 md:m-4 items-center">
        <div className="w-11/12 md:w-1/2">
          <h1 className="text-center mt-4">
            <LocalShippingOutlinedIcon />
            Free delivery within 2-3 business days
          </h1>
          <div className="flex justify-center gap-4 mt-5">
            <button
              className="px-6 py-2 rounded-xl font-bold text-black bg-yellow-600"
              onClick={handleAddToCart}
            >
              Add To Cart
            </button>
            <Link to="/cart">
              <button className="px-8 py-2 rounded-xl font-bold text-black bg-yellow-600">
                Buy Now
              </button>
            </Link>
          </div>
        </div>
        <div className="w-11/12 md:w-1/2 flex flex-col gap-4 px-6 md:px-0 m-2 md:m-0">
          <h1 className="text-yellow-700 text-2xl">Features:</h1>
          <h1>
            Type:
            {category}
          </h1>
          <h1>Brand: {brand}</h1>
          <h1>Category: {category}</h1>
          <h1>Avilability: In stock {stock} products</h1>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
};

export default ProductBrowse;
