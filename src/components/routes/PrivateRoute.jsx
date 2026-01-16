import { Navigate } from "react-router-dom";

function PrivateRoute({ element }) {
  const user = localStorage.getItem("authUser");
  const token = localStorage.getItem("authToken");
  const isAuth = Boolean(user && token);

  if (!isAuth) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }

  return isAuth ? element : <Navigate to="/" replace />;
}

export default PrivateRoute;
