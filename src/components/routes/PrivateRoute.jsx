import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const isAuth = localStorage.getItem("auth") === "true";
  return isAuth ? element : <Navigate to="/" replace />;
}

export default PrivateRoute;
