import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppState } from "../App";

// Protect routes that require login
function PrivateRoute({ children }) {
  const { user } = useContext(AppState);

  if (!user || !user.userid) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default PrivateRoute;
