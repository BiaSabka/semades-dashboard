import { Navigate } from "react-router-dom";

const LOCALHOSTS = new Set(["localhost", "127.0.0.1", "::1"]);
const isLocalhost = () => {
  if (typeof window === "undefined") return false;
  const hostname = window.location?.hostname || "";
  return LOCALHOSTS.has(hostname);
};

function PrivateRoute({ element }) {
  const user = localStorage.getItem("authUser");
  const token = localStorage.getItem("authToken");
  const isAuth = Boolean(user && token);

  if (isLocalhost()) {
    if (!isAuth) {
      localStorage.setItem("authToken", "local-admin");
      localStorage.setItem(
        "authUser",
        JSON.stringify({
          name: "admin",
          email: "admin@localhost",
          picture: "",
          provider: "local",
        })
      );
    }
    return element;
  }

  if (!isAuth) {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  }

  return isAuth ? element : <Navigate to="/" replace />;
}

export default PrivateRoute;
