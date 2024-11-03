import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

export const PrivateRoutes = () => {
    const token = Cookies.get('authToken')
    return (
        token ? <Outlet /> : <Navigate to='/login' />
    )
};