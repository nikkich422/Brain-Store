import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API from "../api/api.js";
import {
  Eye,
  Flame,
  ShoppingBag,
  Star,
  Truck,
  Heart,
  X,
} from "lucide-react";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const messages = [
  "people bought this recently",
  "users are viewing this right now",
  "selling fast today",
  "added to carts today",
  "customers love this product",
  "trending in your area",
  "limited stock available",
  "high demand product",
];

const cities = [
  "Delhi",
  "Mumbai",
  "Bangalore",
  "Pune",
  "Hyderabad",
  "Ahmedabad",
  "Chennai",
  "Kolkata",
];

const categories = [
  "accessories",
  "clothing",
  "food_products",
  "footwear",
  "health_and_nutritions",
  "home_and_furniture",
  "jewellery",
  "kids",
  "toys",
];

const icons = [
  <ShoppingBag size={14} />,
  <Flame size={14} />,
  <Eye size={14} />,
  <Heart size={14} />,
  <Truck size={14} />,
];

const FakeLiveActivity = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const randomCategory =
        categories[Math.floor(Math.random() * categories.length)];

      const { data } = await API.get(
        `/api/product?category=${randomCategory}&perPage=100`
      );

      setProducts(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!products?.length) return;

    const interval = setInterval(() => {
      const product =
        products[Math.floor(Math.random() * products.length)];

      if (!product) return;

      const city =
        cities[Math.floor(Math.random() * cities.length)];

      const message =
        messages[Math.floor(Math.random() * messages.length)];

      const count = Math.floor(Math.random() * 80) + 20;

      const icon =
        icons[Math.floor(Math.random() * icons.length)];

      const toastId = toast.custom(
        (t) => (
          <div
            onClick={() => {
              toast.dismiss(t.id);

              setTimeout(() => {
                navigate(`/product/${product.slug}`);
              }, 250);
            }}
            className={`
              ${
                t.visible
                  ? "animate-[toastIn_0.35s_cubic-bezier(0.22,1,0.36,1)]"
                  : "animate-[toastOut_0.22s_cubic-bezier(0.4,0,1,1)]"
              }
            
              relative
              w-90
              bg-white/95
              backdrop-blur-xl
              rounded-[28px]
              shadow-[0_20px_60px_rgba(0,0,0,0.18)]
              border border-white/30
              overflow-hidden
              cursor-pointer
              group
              origin-bottom-left
            `}
          >
            {/* MAC CLOSE BUTTON */}
            <div className="absolute top-3 left-3 z-50 flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toast.dismiss(t.id);
                }}
                className="cursor-pointer"
              ><RxCross2 />
              </button>
            </div>

            {/* TOP GLOW */}
            <div className="h-1.5 w-full bg-linear-to-r from-orange-500 via-pink-500 to-red-500" />

            <div className="p-4 pt-8">
              <div className="flex gap-4">
                {/* IMAGE */}
                <div className="relative shrink-0">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="
                      w-24 h-24
                      rounded-2xl
                      object-cover
                      border border-gray-100
                    "
                  />

                  {product.discount && (
                    <div
                      className="
                        absolute -top-2 -right-2
                        bg-red-500
                        text-white
                        text-[10px]
                        px-2 py-1
                        rounded-full
                        font-bold
                        shadow-lg
                      "
                    >
                      {product.discount}
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="flex-1 min-w-0">
                  {/* LIVE */}
                  <div className="flex items-center gap-1 text-orange-500 mb-1">
                    {icon}

                    <span className="text-[11px] font-bold tracking-widest uppercase">
                      LIVE ACTIVITY
                    </span>
                  </div>

                  {/* TITLE */}
                  <h2 className="text-sm font-semibold text-gray-800 line-clamp-2 leading-snug">
                    {product.title}
                  </h2>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-black">
                      ₹{product.price}
                    </span>

                    <span className="text-sm text-gray-400 line-through">
                      ₹{product.original_price}
                    </span>
                  </div>

                  {/* RATING */}
                  <div className="flex items-center gap-1 mt-1">
                    <Star
                      size={13}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="text-xs text-gray-600">
                      {product.rating} ({product.review_count})
                    </span>
                  </div>
                </div>
              </div>

              {/* ACTIVITY */}
              <div
                className="
                  mt-4
                  rounded-2xl
                  bg-linear-to-br from-gray-50 to-gray-100
                  border border-gray-200
                  p-3
                "
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-gray-800 leading-snug">
                    🔥 {count} {message}
                  </p>

                  <span
                    className="
                      shrink-0
                      text-[11px]
                      bg-green-100
                      text-green-700
                      px-2 py-1
                      rounded-full
                      font-semibold
                    "
                  >
                    {city}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-red-500 font-semibold">
                    Only {product.stock_count} left
                  </span>

                  <span className="text-xs text-gray-500 capitalize">
                    {product.subCategory?.replaceAll("_", " ")}
                  </span>
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between mt-3">
                <span className="text-[11px] text-gray-400">
                  Just now
                </span>

                <span className="text-[11px] font-medium text-orange-500">
                  Tap to view →
                </span>
              </div>
            </div>
          </div>
        ),
        {
          duration: 3000,
          position: "bottom-left",
        }
      );
    }, 300000);

    return () => clearInterval(interval);
  }, [products, navigate]);

  return null;
};

export default FakeLiveActivity;