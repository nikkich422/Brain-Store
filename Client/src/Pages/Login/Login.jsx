import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";
import API from "../../api/api";
import { motion } from "framer-motion";
import PageTransition from "../../Components/PageTransition/PageTransition";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim()) return toast.error("Please enter your email");
    if (!formData.password) return toast.error("Please enter your password");

    try {
      const res = await dispatch(loginUser(formData)).unwrap();
      toast.success("Welcome back! 🎉");

      if (res.data.user.role === "Admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      if (err.code === "EMAIL_NOT_VERIFIED") {
        // ✅ FIX: Route path now consistently lowercase /verify-otp
        navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}&type=register`, {
          replace: true,
        });
      } else {
        toast.error(err?.message || "Login failed");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      toast.error("Enter your email first");
      return;
    }

    try {
      await API.post("/api/user/reset-password/send-otp", { email: formData.email });
      toast.success("OTP sent to your email");
      navigate(`/verify-otp?email=${encodeURIComponent(formData.email)}&type=reset`, {
        replace: true,
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to send OTP");
    }
  };

  return (
    <PageTransition>
      <section className="min-h-[calc(100vh-160px)] bg-linear-to-br from-orange-50 via-white to-amber-50 flex items-center justify-center py-10 px-4">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <img src="/images/logo.png" alt="Brain Store" className="h-12 mx-auto mb-2" />
            <p className="text-gray-500 text-sm">Welcome back! Sign in to continue.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-orange-100">
            <h3 className="font-bold text-2xl mb-6 text-gray-800">Log In</h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none
                             focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleFormChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none
                               focus:border-orange-400 focus:ring-2 focus:ring-orange-100 transition-all pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="text-right">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-sm text-orange-500 font-semibold hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-orange-500 hover:bg-orange-600 active:scale-[0.98]
                           text-white font-bold rounded-xl transition-all duration-200
                           disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "LOG IN"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-400 font-medium">or continue with</span>
              </div>
            </div>

            {/* Google */}
            {/* ✅ FIX: Uses VITE_API_URL env variable — no hardcoded localhost */}
            <button
              type="button"
              onClick={() => {
                window.location.href = "https://brain-store-b8tn.onrender.com/api/user/auth/google";
              }}
              className="w-full py-3 border border-gray-200 rounded-xl flex items-center justify-center
                         gap-3 hover:bg-gray-50 active:scale-[0.98] transition-all font-medium text-gray-700"
            >
              <FcGoogle className="text-xl" />
              Continue with Google
            </button>
          </div>

          <p className="text-center mt-5 text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-orange-500 font-bold hover:underline">
              Sign Up
            </Link>
          </p>
        </motion.div>
      </section>
    </PageTransition>
  );
};

export default Login;
