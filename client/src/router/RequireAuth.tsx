import Loading from "@/components/common/Loading";
import { useAuth } from "@/utils/helper/useAuth";
import { PrivateRouteProps } from "@/utils/types";
import { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";

const RequireAuth: FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { data, isLoading } = useAuth();
  if (isLoading)
    return (
      <>
        <Loading />
      </>
    );

  if (data) return <>{children}</>;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
