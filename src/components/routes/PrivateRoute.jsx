import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const isAuthFlag = localStorage.getItem("auth") === "true";
  const user = localStorage.getItem("authUser");
  const isAuth = isAuthFlag && Boolean(user);

  if (!isAuth) {
    localStorage.removeItem("auth");
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }
  return isAuth ? element : <Navigate to="/" replace />;
}

export default PrivateRoute;
