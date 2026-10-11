import axios from "axios";

const publicEndpoints = new Set([
    "/auth/",
    "/auth/register"
]);
const api = axios.create({ baseURL: "http://localhost:8000" });
api.interceptors.request.use((config) => {
    if (publicEndpoints.has(config.url)) return config;
    const token = sessionStorage.getItem("token");
    if (token) config.headers.Authorization = token;
    return config;
});

export default api;
