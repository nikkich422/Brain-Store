import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { TbError404 } from "react-icons/tb";
import { MdOutlineHome, MdOutlineSearch } from "react-icons/md";
import PageTransition from "../../Components/PageTransition/PageTransition";

const NotFound = () => {
  return (
    <PageTransition>
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 18 }}
        >
          <TbError404 className="text-[140px] text-orange-400 mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Page Not Found</h1>
          <p className="text-gray-500 mb-8 max-w-md mx-auto text-lg">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl
                         font-semibold hover:bg-orange-600 transition-colors"
            >
              <MdOutlineHome className="text-xl" />
              Go Home
            </Link>
            <Link
              to="/product-listing"
              className="flex items-center gap-2 px-6 py-3 border border-orange-400 text-orange-500
                         rounded-xl font-semibold hover:bg-orange-50 transition-colors"
            >
              <MdOutlineSearch className="text-xl" />
              Browse Products
            </Link>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
