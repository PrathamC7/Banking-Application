import { useContext, useState } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const { setIsAuthenticated, setUserDetail } = useContext(AuthContext);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/", {
                email: email,
                password: password
            });

            sessionStorage.setItem(
                "token",
                response.headers.authorization
            );
            console.log("Login response:", response.data);
            console.log("Before update:", response.data.customer);

            setUserDetail(response.data.customer);
            setIsAuthenticated(true);

            console.log("After setter called:", response.data.customer);
            navigate("/withdraw")
        }
        catch (error) {
            console.log("Error object:", {...error});
            toast.error(error?.response?.data?.detail || "Something went wrong");
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit" >
                    Submit
                </button>
            </form>
        </>
    );
}

export default Login;
