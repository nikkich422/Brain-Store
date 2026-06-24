import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { AnimatePresence } from "framer-motion";

import API from "./api/api";
import { setAuthChecked, setToken, setUser } from "./redux/slice/authSlice";
import { getCartItems } from "./redux/slice/cartSlice";
import { fetchWishlist } from "./redux/slice/wishlistSlice";

// Layouts
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";

// Non-lazy (small, always needed)
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import CartDrawer from "./Pages/Cart/CartDrawer";
import FakeLiveActivity from "./Components/FakeLiveActivity";
import ScrollToTop from "./Components/ScrollToTop/ScrollToTop";
import PageLoader from "./Components/PageLoader/PageLoader";
import ErrorBoundary from "./Components/ErrorBoundary/ErrorBoundary";
import Categories from "./Pages/Admin/Categories/Categories";

// ✅ IMPROVEMENT: Lazy-load heavy pages — reduces initial bundle size significantly
const Order_Tracking = lazy(() => import("./Pages/Order_Tracking/Order_Tracking"));
const HelpCenter = lazy(() => import("./Pages/HelpCenter/HelpCenter"));
const ProductListing = lazy(() => import("./Pages/ProductListing/ProductListing"));
const ProductDetails = lazy(() => import("./Pages/ProductDetails/ProductDetails"));
const Cart = lazy(() => import("./Pages/Cart/Cart"));
const PasswordReset = lazy(() => import("./Pages/PasswordReset/PasswordReset").then(m => ({ default: m.PasswordReset })));
const VerifyOtp = lazy(() => import("./Pages/VerifyOtp/VerifyOtp").then(m => ({ default: m.VerifyOtp })));
const Checkout = lazy(() => import("./Pages/Checkout/Checkout"));
const MyAccount = lazy(() => import("./Pages/MyAccount/MyAccount"));
const OrderSuccess = lazy(() => import("./Pages/OrderSuccess"));
const MyOrders = lazy(() => import("./Pages/MyOrders"));
const OrderDetails = lazy(() => import("./Pages/OrderDetails"));
const WishlistItems = lazy(() => import("./Pages/WishlistItems"));
const ComparePage = lazy(() => import("./Pages/comparePage"));
const OAuthSuccess = lazy(() => import("./Pages/OauthSuccess"));
const NotFound = lazy(() => import("./Pages/NotFound/NotFound"));
const Unauthorized = lazy(() => import("./Pages/Unauthorized/Unauthorized"));

// Admin (lazy — only loaded for admins)
const Dashboard = lazy(() => import("./Pages/Admin/Dashboard/Dashboard"));
const ProductList = lazy(() => import("./Pages/Admin/ProductList"));
const AddProduct = lazy(() => import("./Pages/Admin/AddProduct"));
const EditProduct = lazy(() => import("./Pages/Admin/EditProduct"));
const Users = lazy(() => import("./Pages/Admin/Users/Users"));
const AdminOrders = lazy(() => import("./Pages/Admin/AdminOrders"));
const AdminOrderDetails = lazy(() => import("./Pages/Admin/AdminOrderDetails"));
const Banners = lazy(() => import("./Pages/Admin/Banners"));

// Full-screen spinner for lazy-loaded routes
const RouteSpinner = () => (
  <div className="min-h-[60vh] flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

// Inner component so useLocation works inside BrowserRouter
function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<RouteSpinner />}>
        <Routes location={location} key={location.pathname}>
          {/* User Routes */}
          <Route element={<UserLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/order-tracking" element={<Order_Tracking />} />
            <Route path="/help-center" element={<HelpCenter />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product-listing" element={<ProductListing />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/reset-password" element={<PasswordReset />} />
            {/* ✅ FIX: Route case was /verify-Otp — now consistently lowercase */}
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/wishlist" element={<WishlistItems />} />
            <Route path="/compare" element={<ComparePage />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />
            <Route path="products/list" element={<ProductList />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="orders/:id" element={<AdminOrderDetails />} />
            <Route path="banner" element={<Banners />} />
            <Route path="categories" element={<Categories />}/>
          </Route>

          {/* Error Routes */}
          {/* ✅ FIX: Proper 404 and Unauthorized pages instead of bare <h2> */}
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.auth?.user);

  // ✅ FIX: Added dispatch to dependency array (was missing before)
  useEffect(() => {
    const silentLogin = async () => {
      try {
        const res = await API.post("/api/user/refresh-token");
        dispatch(setToken(res.data.data.accessToken));
        dispatch(setUser(res.data.data.user));
      } catch {
        // User not logged in — that's fine, not an error
      } finally {
        dispatch(setAuthChecked(true));
      }
    };
    silentLogin();
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(getCartItems());
      dispatch(fetchWishlist());
    }
  }, [user, dispatch]); // ✅ FIX: dispatch added to dependency array

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ScrollToTop />
        <PageLoader>
          <AppRoutes />
        </PageLoader>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              borderRadius: "12px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "14px",
              fontWeight: "600",
            },
            success: {
              iconTheme: { primary: "#e06213", secondary: "#fff" },
            },
          }}
        />
        <CartDrawer />
        <FakeLiveActivity />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
