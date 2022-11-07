import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
  const { user } = useSelector((state) => state.user);

  if (user) {
    return <Outlet />;
  }

  return <Navigate to="/admin/login" />;
}

export default RequireAuth;
