import { Outlet, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoutes = () => {
    const user = Cookies.get('token');
    return user ? <Outlet /> : <Navigate to="/login" />

}

export default ProtectedRoutes