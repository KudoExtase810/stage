import axios from "axios";
import useAuth from "../hooks/useAuth";

//JWT
const { token } = useAuth();

// Basic axios instance
const normalFetch = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// axios instance (provides jwt)
const authFetch = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export { normalFetch, authFetch };
