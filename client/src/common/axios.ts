import axios from "axios";

const axiosIns = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

// axios instance (provides jwt)
// export const authFetch = axios.create({
//     baseURL: import.meta.env.VITE_API_BASE_URL,
//     headers: {
//         authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//     },
//     withCredentials: true,
// });

export default axiosIns;
