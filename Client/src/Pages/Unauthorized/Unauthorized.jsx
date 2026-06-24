import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MdOutlineLock, MdOutlineHome } from "react-icons/md";
import PageTransition from "../../Components/PageTransition/PageTransition";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 180 }}
        >
          <MdOutlineLock className="text-[120px] text-orange-400 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl font-bold text-gray-800 mt-4 mb-3">Access Denied</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto">
            You don't have permission to access this page. Please log in with an authorized account.
          </p>

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              Go Back
            </button>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl
                         font-semibold hover:bg-orange-600 transition-colors"
            >
              <MdOutlineHome className="text-xl" />
              Go Home
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default Unauthorized;
