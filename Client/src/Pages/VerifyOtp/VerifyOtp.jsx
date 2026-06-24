import { useEffect, useRef, useState } from "react";
import { MdOutlineSystemSecurityUpdateGood } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { verifyOtp } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";
import API from "../../api/api";

export const VerifyOtp = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const inputsRef = useRef([]);

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const location = useLocation();

  // get email from query params
  const params = new URLSearchParams(location.search);
  const email = params.get("email");
  const type = params.get("type");

  // no email → redirect
  useEffect(() => {
    if (!email) {
      navigate("/", { replace: true });
    }
  }, [email, navigate]);

  // focus first input
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // timer logic
  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearInterval(interval);
  }, [timer]);

  // auto submit
  useEffect(() => {
    const finalOtp = otp.join("");

    if (finalOtp.length === 6 && !loading) {
      handleVerify();
    }
  }, [otp]);

  // verify OTP
  const handleVerify = async () => {
    if(submitting) return;
    setSubmitting(true);

    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      toast.error("Enter complete OTP");
      return;
    }

    try {
      if (type === "reset") {
        await API.post("/api/user/reset-password/verify-otp", {
          email,
          otp: finalOtp,
        });
      
        toast.success("OTP verified");
      
        navigate(`/reset-password?email=${encodeURIComponent(email)}`);
      } else {
        await dispatch(verifyOtp({ email, otp: finalOtp })).unwrap();
      
        toast.success("OTP Verified & Logged in 🎉");
      
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.message || "Invalid OTP");
    } finally{
      setSubmitting(false);
    }
  };

  // resend OTP
  const handleResend = async () => {
    try {
      await API.post("/api/user/resend-email-otp", { email });

      toast.success("OTP resent successfully");

      setTimer(30);
      setCanResend(false);
      setOtp(["", "", "", "", "", ""]);
      inputsRef.current[0]?.focus();
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  // input change
  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    const filledOtp = [...newOtp];
    while(filledOtp.length < 6){
      filledOtp.push("");
    }

    setOtp(filledOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  // backspace
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  // paste
  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text").slice(0, 6);

    if (!/^\d+$/.test(pasteData)) return;

    const newOtp = pasteData.split("");
    setOtp(newOtp);
  };

  return (
    <section className="bg-gray-100 flex justify-center py-10">
      <div className="w-100 flex justify-center flex-col px-6 py-8 border border-gray-200 bg-white">
        <div className="flex justify-center mb-2">
          <MdOutlineSystemSecurityUpdateGood className="text-3xl" />
        </div>

        <h3 className="font-bold text-[24px] text-center mb-2">
          Verify OTP
        </h3>

        <p className="mb-6 text-center">
          OTP sent to{" "}
          <span className="font-bold text-[#e06213]">
            {email}
          </span>
        </p>

        {/* OTP INPUTS */}
        <div className="flex gap-3 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(el) => (inputsRef.current[index] = el)}
              className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {/* VERIFY BUTTON */}
        <button
          className="btn-primary mt-6 w-full py-2! font-bold text-xl"
          disabled={loading}
          onClick={handleVerify}
        >
          {loading ? "Verifying..." : "VERIFY OTP"}
        </button>

        {/* RESEND */}
        <div className="text-center mt-4">
          {canResend ? (
            <button
              onClick={handleResend}
              className="text-blue-600 font-semibold cursor-pointer hover:text-blue-900"
            >
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">
              Resend in {timer}s
            </p>
          )}
        </div>
      </div>
    </section>
  );
};