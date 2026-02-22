import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, isLogin, role }) {
  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (role !== "Admin") {
    return <Navigate to="/NotFound" />;
  }

  return children;
}