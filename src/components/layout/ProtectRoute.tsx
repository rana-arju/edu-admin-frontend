import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import {
  IUser,
  logout,
  useCurrentToekn,
} from "../../redux/features/auth/authSlice";
import { Navigate } from "react-router-dom";
import { verifyToekn } from "../../utils/verifyToken";
type IProtectedRoute = {
  children: ReactNode;
  role: string;
};
const ProtectRoute = ({ children, role }: IProtectedRoute) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToekn);
  let user;
  if (token) {
    user = verifyToekn(token);
  }
  if (!token) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }
  if (role !== (user as IUser)?.role) {
    dispatch(logout());
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default ProtectRoute;
