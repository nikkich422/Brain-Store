import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartLocal,
  closeCartDrawer,
  deleteCartItem,
  removeFromCartLocal,
  updateCartItems,
  updateQtyLocal,
} from "../../redux/slice/cartSlice";
import Drawer from "@mui/material/Drawer";
import { IoCloseSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { GrFormSubtract } from "react-icons/gr";
import { IoMdAdd } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineShoppingBag } from "react-icons/md";
import { Link } from "react-router-dom";

const CartDrawer = () => {
  const showCartDrawer = useSelector((store) => store?.cart?.showCartDrawer);
  const cartItems = useSelector((store) => store?.cart?.cartItems);
  const loading = useSelector((store) => store?.cart?.loading);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const closeDrawer = () => dispatch(closeCartDrawer());

  const handleDeleteItem = (productId, size) => {
    // ✅ FIX: Removed debug alert("called") — was left in by accident
    productId = typeof productId === "object" ? productId._id : productId;

    const prevItem = cartItems.find(
      (item) =>
        (item.productId === productId || item.productId?._id === productId) &&
        (item.size || null) === (size || null)
    );

    dispatch(removeFromCartLocal({ productId, size }));
    dispatch(deleteCartItem({ productId, size }))
      .unwrap()
      .then(() => toast.success("Item removed from cart"))
      .catch(() => {
        if (prevItem) dispatch(addToCartLocal(prevItem));
        toast.error("Failed to remove item.");
      });
  };

  const handleQtyChange = (productId, size, newQty) => {
    const prodId = typeof productId === "object" ? productId._id : productId;
    const item = cartItems.find(
      (i) =>
        (i.productId === prodId || i.productId?._id === prodId) &&
        (i.size || null) === (size || null)
    );
    if (!item) return;

    const prevQty = item.quantity;
    dispatch(updateQtyLocal({ productId: prodId, size, quantity: newQty }));

    dispatch(updateCartItems({ productId: prodId, size, quantity: newQty }))
      .unwrap()
      .catch(() => {
        dispatch(updateQtyLocal({ productId: prodId, size, quantity: prevQty }));
        toast.error("Failed to update quantity.");
      });
  };

  const totalPrice = cartItems.reduce((total, curr) => total + curr.price * curr.quantity, 0);
  const shippingCharge = totalPrice > 499 ? 0 : 40;

  const handleCheckout = () => {
    if (cartItems.length === 0) return toast.error("Your cart is empty!");
    navigate("/checkout");
    closeDrawer();
  };

  return (
    <Drawer
      anchor="right"
      open={showCartDrawer}
      onClose={closeDrawer}
      PaperProps={{ sx: { width: 400 } }}
    >
      {/* Header */}
      <div className="border-b border-gray-100 py-3 flex justify-between px-4 items-center bg-white sticky top-0 z-10">
        <h3 className="font-bold text-lg flex items-center gap-2">
          <MdOutlineShoppingBag className="text-orange-500" />
          Cart
          <span className="text-sm font-normal text-gray-400">({cartItems.length} items)</span>
        </h3>
        <button
          onClick={closeDrawer}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close cart"
        >
          <IoCloseSharp className="text-xl" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-auto pb-48">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-350px)] gap-4 px-6 text-center">
            <img className="w-48 opacity-70" src="/images/cart/empty-cart.png" alt="empty cart" />
            <h4 className="font-semibold text-gray-700">Your cart is empty</h4>
            <p className="text-sm text-gray-400">Add items you like to your cart</p>
            <Link
              to="/product-listing"
              onClick={closeDrawer}
              className="px-5 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold hover:bg-orange-600 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {cartItems.map((product) => (
              <motion.div
                key={`${product.productId?._id || product.productId}-${product.size}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30, height: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-start gap-3 border-b border-gray-100 p-4 relative"
              >
                {/* Image */}
                <div className="w-20 h-20 flex-shrink-0 border border-gray-100 rounded-lg overflow-hidden bg-gray-50 flex items-center justify-center">
                  <img className="h-18 object-contain" src={product?.image} alt={product?.title} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 mb-1">
                    {product?.title}
                  </h3>

                  {product.size && (
                    <span className="text-xs text-gray-500 inline-block mb-2">
                      Size: <span className="font-semibold text-gray-700">{product.size}</span>
                    </span>
                  )}

                  <div className="flex items-center justify-between">
                    {/* Qty controls */}
                    <div className="flex items-center gap-2">
                      <button
                        className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
                        onClick={() => handleQtyChange(product.productId, product.size, product.quantity - 1)}
                        disabled={loading || product.quantity <= 1}
                        aria-label="Decrease quantity"
                      >
                        <GrFormSubtract className="text-sm" />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{product.quantity}</span>
                      <button
                        className="w-7 h-7 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors disabled:opacity-40"
                        onClick={() => handleQtyChange(product.productId, product.size, product.quantity + 1)}
                        disabled={loading}
                        aria-label="Increase quantity"
                      >
                        <IoMdAdd className="text-sm" />
                      </button>
                    </div>

                    <span className="font-bold text-orange-500">
                      ₹{(product.price * product.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => handleDeleteItem(product?.productId, product?.size)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                  aria-label="Remove item"
                >
                  <FaTrashAlt className="text-sm" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer Summary */}
      {cartItems.length > 0 && (
        <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1.5">
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Subtotal ({cartItems.length} items)</span>
              <span className="font-medium text-gray-700">₹{totalPrice.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>Shipping</span>
              <span className={shippingCharge === 0 ? "text-green-600 font-semibold" : "font-medium text-gray-700"}>
                {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
              </span>
            </div>
            <div className="flex justify-between items-center font-bold text-base border-t border-gray-100 pt-2">
              <span>Total</span>
              <span className="text-orange-500">₹{(totalPrice + shippingCharge).toLocaleString("en-IN")}</span>
            </div>
          </div>
          <div className="px-4 pb-4">
            <button
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-bold rounded-xl transition-all"
              onClick={handleCheckout}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
};

export default CartDrawer;
