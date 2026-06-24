import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/slice/authSlice";
import Button from "@mui/material/Button";

export const PasswordReset = () => {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const email = params.get("email");

  // safe redirect
  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  // realtime validation
  const passwordsMatch =
    formData.confirmPassword &&
    formData.newPassword === formData.confirmPassword;

  const showError =
    formData.confirmPassword &&
    formData.newPassword !== formData.confirmPassword;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!formData.newPassword) {
      toast.error("Enter new password");
      return;
    }

    if (formData.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (!formData.confirmPassword) {
      toast.error("Enter confirm password");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await dispatch(
        resetPassword({
          email,
          password: formData.newPassword,
        })
      ).unwrap();

      toast.success("Password reset successfully 🎉");

      navigate("/login", { replace: true });
    } catch (err) {
      toast.error(err?.message || "Reset failed");
    }
  };

  return (
    <section className="bg-gray-100 flex justify-center py-10">
      <div className="w-100 flex flex-col px-6 py-8 border border-gray-200 bg-white">
        <h3 className="font-bold text-[19px] text-center mb-6">
          Reset Password
        </h3>

        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* NEW PASSWORD */}
          <FormControl className="mt-4! relative">
            <InputLabel>New Password</InputLabel>
            <OutlinedInput
              autoFocus
              type={showNewPassword ? "text" : "password"}
              label="New Password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </FormControl>

          {/* CONFIRM PASSWORD */}
          <FormControl className="mt-4! relative" error={showError}>
            <InputLabel>Confirm Password</InputLabel>
            <OutlinedInput
              type={showConfirmPassword ? "text" : "password"}
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>

            {/* Error */}
            {showError && (
              <p className="text-red-500 text-sm mt-1!">
                Passwords do not match
              </p>
            )}

            {/* Success */}
            {passwordsMatch && (
              <p className="text-green-600 text-sm mt-1!">
                Passwords match ✓
              </p>
            )}
          </FormControl>

          {/* BUTTON */}
          <Button
            type="submit"
            disabled={loading || showError}
            className="btn-primary mt-6! w-full py-2! font-bold! text-xl"
          >
            {loading ? "Resetting..." : "RESET PASSWORD"}
          </Button>
        </form>
      </div>
    </section>
  );
};