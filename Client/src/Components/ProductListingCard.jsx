import { useState, useCallback } from "react";
import { Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleLocalWishlist, toggleWishlist } from "../redux/slice/wishlistSlice";
import toast from "react-hot-toast";
import { addToCompare, removeFromCompare } from "../redux/slice/compareSlice";
import { IoGitCompareOutline } from "react-icons/io5";
import { motion } from "framer-motion";

const ProductListingCard = ({ item, loading }) => {
  const navigate = useNavigate();
  const items = useSelector((store) => store.wishlist.items);
  const dispatch = useDispatch();

  const isWishlisted = items.some((i) => i._id === item?._id || i === item?._id);

  const compareItems = useSelector((store) => store.compare.items);
  const isCompared = compareItems.some((i) => i._id === item?._id);

  const handleWishlist = useCallback(
    async (e) => {
      e.stopPropagation();
      if (loading || !item?._id) return;

      dispatch(toggleLocalWishlist(item));
      try {
        await dispatch(toggleWishlist(item._id)).unwrap();
      } catch {
        dispatch(toggleLocalWishlist(item));
        toast.error("Failed to update wishlist.");
      }
    },
    [loading, dispatch, item]
  );

  const handleCompare = (e) => {
    e.stopPropagation();
    if (!item?._id) return;

    if (isCompared) {
      dispatch(removeFromCompare(item._id));
    } else {
      if (compareItems.length >= 4) {
        return toast.error("You can compare max 4 products");
      }
      dispatch(addToCompare(item));
    }
  };

  // Skeleton state
  if (loading) {
    return (
      <div className="w-62.5 border border-gray-100 rounded-2xl p-3 bg-white shadow-sm">
        <div className="animate-pulse">
          <div className="h-44 w-full bg-gray-200 rounded-xl mb-3" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
          <div className="mt-2 flex gap-2">
            <div className="h-3 w-20 bg-gray-200 rounded" />
            <div className="h-3 w-10 bg-gray-200 rounded" />
          </div>
          <div className="mt-3 flex gap-2">
            <div className="h-5 w-16 bg-gray-300 rounded" />
            <div className="h-4 w-12 bg-gray-200 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // ✅ FIX: Safety check — if item is null/undefined don't crash
  if (!item) return null;

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className="w-62 border border-gray-100 rounded-2xl p-3 cursor-pointer bg-white relative overflow-hidden group"
      onClick={() => item.slug && navigate(`/product/${item.slug}`)}
    >
      {/* Wishlist */}
      <button
        className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md z-10 transition-transform hover:scale-110"
        onClick={handleWishlist}
        aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <FaHeart className={`text-xl transition-colors ${isWishlisted ? "text-red-500" : "text-gray-200 hover:text-red-400"}`} />
      </button>

      {/* Compare */}
      <button
        className="absolute top-14 right-3 bg-white p-2 rounded-full shadow-md z-10 transition-transform hover:scale-110"
        onClick={handleCompare}
        aria-label={isCompared ? "Remove from compare" : "Add to compare"}
      >
        <IoGitCompareOutline className={`text-xl transition-colors ${isCompared ? "text-orange-500" : "text-gray-200 hover:text-orange-400"}`} />
      </button>

      {/* Discount Badge */}
      {item.discount && item.discount !== "0%" && (
        <div className="absolute top-3 left-3 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
          {item.discount}
        </div>
      )}

      {/* Image */}
      <div className="h-44 flex items-center justify-center overflow-hidden mb-2">
        <LazyLoadImage
          src={item.image}
          alt={item.title}
          effect="blur"
          className="h-44 w-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title */}
      <p className="text-sm font-medium line-clamp-2 text-gray-800 mb-1">{item.title}</p>

      {/* Brand */}
      {item.brand && <p className="text-xs text-gray-400 mb-1">{item.brand}</p>}

      {/* Rating */}
      <div className="flex items-center gap-1 mb-2">
        <Rating value={item.rating || 0} readOnly size="small" precision={0.5} />
        {item.review_count > 0 && (
          <span className="text-xs text-gray-400">({item.review_count})</span>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-base font-bold text-gray-900">
          ₹{(item.price || 0).toLocaleString("en-IN")}
        </span>
        {item.original_price > item.price && (
          <span className="text-xs text-gray-400 line-through">
            ₹{item.original_price.toLocaleString("en-IN")}
          </span>
        )}
        {item.discount && item.discount !== "0%" && (
          <span className="text-green-600 text-xs font-semibold">{item.discount}</span>
        )}
      </div>

      <p className="text-xs text-gray-400 mt-1">Free delivery</p>

      {/* Out of stock overlay */}
      {item.in_stock === false && (
        <div className="absolute inset-0 bg-white/75 flex items-center justify-center rounded-2xl z-20 backdrop-blur-[1px]">
          <span className="text-red-500 font-bold text-sm border border-red-200 bg-red-50 px-3 py-1 rounded-full">
            Out of Stock
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ProductListingCard;
