import { useSelector } from "react-redux";

/**
 * PageLoader wraps the entire app and shows a spinner
 * while the silent login (refresh token check) is in progress.
 * This prevents the app from briefly flashing the logged-out state.
 */
const PageLoader = ({ children }) => {
  const isAuthChecked = useSelector((state) => state.auth.isAuthChecked);

  if (!isAuthChecked) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm font-medium">Loading Brain Store...</p>
      </div>
    );
  }

  return children;
};

export default PageLoader;
