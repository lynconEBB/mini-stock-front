import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth"

const PrivateRoutes = ({ roles }) => {
    const { user } = useAuth();

    const canAccessRoute = () => {
        return user !== null && roles.includes(user.role);
    }

    return (
        canAccessRoute() ? <Outlet/> : <Navigate to="/login" />
    )
}

export default PrivateRoutes;