import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: {
        Authorization: "Buceta"
    }
});

export const useApi = () => {
    const authApi = axios.create({
        baseURL: "http://localhost:8080",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
    });

    return {
        authApi
    }
}

export default api;