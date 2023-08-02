import axios from "axios";

//JWT
const token = "No token for now";

// Basic axios instance
const normalFetch = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// axios isntance (provides user's role)
const roleFetch = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Role": "admin",
    },
});

// axios instance (provides jwt)
const authFetch = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    },
});

export { normalFetch, roleFetch, authFetch };
