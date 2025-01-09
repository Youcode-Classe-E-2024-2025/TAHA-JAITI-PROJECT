import apiClient from "@/api/apiClient";
import ApiResponse from "@/types/api";
import { Token, Permission } from "@/types/auth";

const authService = {
    login: (email: string, password: string) =>
        apiClient.post<ApiResponse<Token>>('/auth/login', { email, password }),

    register: (name: string, email: string, password: string, role: number) =>
        apiClient.post('/auth/register', { name, email, password, role }),

    getMe: () =>
        apiClient.get('/auth/me'),

    getPerms: (id: number) =>
        apiClient.get<ApiResponse<Permission>>(`/roles/${id}/permissions`),
}

export default authService;