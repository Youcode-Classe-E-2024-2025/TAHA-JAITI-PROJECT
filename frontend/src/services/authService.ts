import apiClient from "@/api/apiClient";

const authService = {
    login: (email: string, password: string) => apiClient.post('/auth/login', {email ,password}),
    register: (name: string, email: string, password: string) => apiClient.post('/auth/login', {name, email ,password}),
    getMe: () => apiClient.get('/auth/me'),
    getPerms: () => apiClient.get('/auth/me'),
}

export default authService;