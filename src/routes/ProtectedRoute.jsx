import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
//   console.log(userInfo);
  if (!userInfo) {
    return <Navigate to="/login" />;
  } else if(userInfo.user.role !== "admin"){
    return <Navigate to="/" />;
  }

  return <>{children || <Outlet />}</>;
};

export default ProtectedRoute;
