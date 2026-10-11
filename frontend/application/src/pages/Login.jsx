import { useContext, useState } from "react";
import api from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { setIsAuthenticated, setUserDetail } = useContext(AuthContext);
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/", {
                email,
                password,
            });

            sessionStorage.setItem(
                "token",
                response.headers.authorization
            );
            setUserDetail(response.data.customer);
            sessionStorage.setItem("userDetail", JSON.stringify(response.data.customer));
            setIsAuthenticated(true);
            navigate("/dashboard");
        } catch (error) {
            toast.error(error?.response?.data?.detail || "Something went wrong");
        }
    };

    return (
        <>
            <form onSubmit={handleLogin}>
                <label>
                    Email
                    <input
                    type="text"
                    autoComplete="username"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </label>

                <label>
                    Password
                    <input
                    type="password"
                    autoComplete="current-password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </label>

                <button type="submit" >
                    Submit
                </button>
            </form>
        </>
    );
}

export default Login;
