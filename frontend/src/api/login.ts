import apiClient from "@/api";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const login = async (email: string, password: string) => {
    try {
        const response = await apiClient.post(`${API_URL}/auth/login`, { email, password });

       console.log(response);
    } catch (err: any) {
        console.error('Login failed:', err.response?.data || err.message);
        throw err;
    }
};

export default login;
