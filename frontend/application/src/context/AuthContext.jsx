import { createContext, useEffect, useState } from "react";
import api from "../services/api";
export const AuthContext =  createContext();
function AuthenticationProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const logout = ()=>{
        sessionStorage.removeItem("token");
        setIsAuthenticated(false);
    }
    useEffect(() => {
    const restoreAuthentication = async () => {
        const token = sessionStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                await api.get("/customer/");
                setIsAuthenticated(true);
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        restoreAuthentication();
    }, []);

    return <AuthContext.Provider value = {{isAuthenticated, setIsAuthenticated, logout}}>
            {children}
        </AuthContext.Provider>
        
}
export default AuthenticationProvider