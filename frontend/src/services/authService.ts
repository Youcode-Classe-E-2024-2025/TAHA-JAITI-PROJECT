import apiClient from "@/api";

const authService = {
    login: (email: string, password: string) => apiClient.post('/auth/login', {email ,password}),
    register: (name: string, email: string, password: string) => apiClient.post('/auth/login', {name, email ,password}),
    getMe: () => apiClient.get('/auth/porifle'),
}

export default authService;