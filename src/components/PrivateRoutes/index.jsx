import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"

const PrivateRoutes = ({ roles }) => {
    const { isAuthenticated, getUser } = useAuth();

    const canAccessRoute = () => {
        return isAuthenticated() && roles.includes(getUser().role);
    }

    return (
        canAccessRoute() ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;