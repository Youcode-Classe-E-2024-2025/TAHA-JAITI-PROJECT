import apiClient from "@/api/apiClient";

const authService = {
    login: (email: string, password: string) => apiClient.post('/auth/login', {email ,password}),
    register: (name: string, email: string, password: string, role: number) => apiClient.post('/auth/register', {name, email ,password, role}),
    getMe: () => apiClient.get('/auth/me'),
    getPerms: (id: number) => apiClient.get(`roles/${id}/permissions`),
}

export default authService;