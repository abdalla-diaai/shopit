import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import api from '../../api';

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const location = useLocation();
    useEffect(() => {
        checkAuthorization()
        .catch(() => {
            setIsAuthorized(false);
        }
        );
    }, []);

    async function refreshToken() {
        const refereshToken = localStorage.getItem('refresh');
        try{
            const response = await api.post('/token/refresh/', { refresh: refereshToken });
            if (response.status === 200) {
                localStorage.setItem('access', response.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            };
        }
        catch {
            setIsAuthorized(false);
        };
        
    }
    async function checkAuthorization() {
        const token = localStorage.getItem('access');
        if (!token) {
            setIsAuthorized(false);
            return;
        };
        const decoded = jwtDecode(token);
        const expiry_time = decoded.exp;
        const current_time = Date.now() / 1000;
        if (expiry_time > current_time) {
            await refreshToken();
        }
        else {
            setIsAuthorized(true);
        };
    };

    if (isAuthorized === null) {
        return (
            <div>
                <h1>log in </h1>
            </div>
        );
    }; 


        return ( 
            isAuthorized ? children : <Navigate to='/login' state={{ from: location }} replace />
        );
    }

    export default ProtectedRoute;