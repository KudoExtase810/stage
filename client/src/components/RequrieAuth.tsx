import { useLocation, Outlet, Navigate } from "react-router-dom";
import useToken from "../hooks/useToken";

interface props {
    allowedRoles: User["role"][];
}

const RequireAuth = ({ allowedRoles }: props) => {
    const { role, token } = useToken();
    const location = useLocation();

    return token && allowedRoles.includes(role) ? (
        <Outlet />
    ) : token ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
