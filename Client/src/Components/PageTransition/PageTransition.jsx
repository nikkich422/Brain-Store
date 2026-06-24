import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit:    { opacity: 0, y: -16 },
};

/**
 * PageTransition — wrap any page component with this to get smooth
 * enter/exit animations between routes.
 *
 * Usage:
 *   const MyPage = () => (
 *     <PageTransition>
 *       ...page content...
 *     </PageTransition>
 *   );
 */
const PageTransition = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.25, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

export default PageTransition;
