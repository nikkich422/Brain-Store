// /oauth-success
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { setToken } from "../redux/slice/authSlice";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const token = params.get("token");

    if (token) {
      dispatch(setToken(token));
      navigate("/");
    }
  }, []);

  return <p>Logging you in...</p>;
}