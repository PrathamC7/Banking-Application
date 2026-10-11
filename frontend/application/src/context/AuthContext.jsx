import { createContext, useEffect, useState } from "react";
import api from "../services/api";
export const AuthContext = createContext();

function AuthenticationProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [userDetail, setUserDetail] = useState(null);
    const logout = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("userDetail");
        setUserDetail(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const restoreAuthentication = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                setUserDetail(null);
                setIsAuthenticated(false);
                return;
            }

            try {
                await api.get("/customer/");
                const savedUser = sessionStorage.getItem("userDetail");
                if (savedUser) setUserDetail(JSON.parse(savedUser));
                setIsAuthenticated(true);
            } catch (error) {
                sessionStorage.removeItem("token");
                sessionStorage.removeItem("userDetail");
                setIsAuthenticated(false);
            }
        };

        restoreAuthentication();
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, setIsAuthenticated, logout, userDetail, setUserDetail }}
        >
            {children}
        </AuthContext.Provider>
    );
}
export default AuthenticationProvider;
