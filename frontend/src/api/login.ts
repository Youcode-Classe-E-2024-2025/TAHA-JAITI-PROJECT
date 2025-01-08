import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post(`${API_URL}/api/auth/login`, { email, password });

        if (response.status === 200) {
            console.log('Login successful:', response.data);
            return response.data;
        }

    } catch (err: any) {
        console.error('Login failed:', err.response?.data || err.message);
        throw err;
    }
};

export default login;
