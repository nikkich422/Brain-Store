import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchWishlist } from "../redux/slice/wishlistSlice";
import ProductListingCard from "../Components/ProductListingCard";
import { useNavigate } from "react-router-dom";

const WishlistItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    // unnecessary API calls avoid karo
    dispatch(fetchWishlist());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          My Wishlist ({items.length})
        </h2>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-52">
          <p className="text-gray-500 text-lg animate-pulse">
            Loading your wishlist...
          </p>
        </div>
      )}

      {/* Empty State */}
      {!loading && items.length === 0 && (
        <div className="flex flex-col items-center justify-center h-72 text-center">
          <p className="text-gray-500 text-lg mb-4">
            Your wishlist is empty 
          </p>

          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 bg-black text-white rounded-lg btn-secondary transition"
          >
            Start Shopping
          </button>
        </div>
      )}

      {/* Wishlist Items */}
      {!loading && items.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {items.map((item) => (
            <ProductListingCard key={item._id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistItems;