import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute — guards routes by auth state and role.
 *
 * Props:
 *  - children: the component to render if authorized
 *  - allowedRoles: string or string[] of roles that can access this route
 *
 * Usage:
 *  <ProtectedRoute allowedRoles={["Admin"]}>
 *    <AdminDashboard />
 *  </ProtectedRoute>
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, accessToken, isAuthChecked } = useSelector((state) => state.auth);

  // Wait for silent login to complete — PageLoader handles the spinner at app level,
  // but we guard here too for nested protected routes
  if (!isAuthChecked) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but wrong role → redirect to unauthorized
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  if (allowedRoles && !roles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
