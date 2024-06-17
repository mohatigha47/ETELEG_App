import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from "js-cookie";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const RoleProtectedRoute = ({ allowedRoles }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const fetchUser = async () => {
                try {
                    const response = await axios.get(`http://localhost:3001/users/${decodedToken.userId}`);
                    setUser(response.data);
                } catch (err) {
                    console.error(err);
                }
            };
            fetchUser();
        }
    }, []);


    // if (!user) {
    //     return <Navigate to="/login" />;
    // }

    if (user) {
        if (!allowedRoles.includes(user.role)) {
            return <Navigate to="/not-authorized" />;
        }
    }

    return <Outlet />;
};

export default RoleProtectedRoute;
