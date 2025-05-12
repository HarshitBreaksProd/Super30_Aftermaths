import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = () => {
  const { userInfo } = useAppSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
