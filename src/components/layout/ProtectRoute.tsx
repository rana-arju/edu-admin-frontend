import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { useCurrentToekn } from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";

const ProtectRoute = ({ children }: { children: ReactNode }) => {
  const token  = useAppSelector(useCurrentToekn);
  if (!token) {
    return <Navigate to={"/login"} replace= {true} />
    
  }
  return children;
};

export default ProtectRoute;
