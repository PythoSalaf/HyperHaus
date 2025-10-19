import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {
  const { authenticated, ready } = useSelector((state) => state.auth);
  console.log("ProtectedRoute state:", { authenticated, ready });

  if (!ready) {
    return <div>Loading...</div>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
