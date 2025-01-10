import { createContext, useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import api from '../api'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState("");


    const handleAuth = () => {
        const token = localStorage.getItem("access");
        if (token) {
            const decoded = jwtDecode(token);
            const expiryTime = decoded.exp;
            const currentTime = Date.now() / 1000;
            if (expiryTime > currentTime) {
                setIsAuthenticated(true);
            };
        };
    };

    function getUsername() {
        if (!isAuthenticated) {
            return;
        };
        api.get('/get_username/')
            .then((response) => {
                setUsername(response.data.username);
            })
            .catch((error) => {
                console.error("Failed to fetch username:", error);
            });
    };

    useEffect(() => {
        handleAuth();
    }, []);

    useEffect(() => {
        getUsername();
    }, [isAuthenticated]);

    const authValue = { isAuthenticated, username, setIsAuthenticated, getUsername }

    return (
        <AuthContext.Provider value={authValue}> {children} </AuthContext.Provider>
    );
};
