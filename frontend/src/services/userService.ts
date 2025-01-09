import apiClient from "@/api/apiClient";
import ApiResponse from "@/types/api";
import { User } from "@/types/auth";

const getUsers = () => apiClient.get<ApiResponse<User[]>>(`/users`);

const getUserById = (id: number) => apiClient.get<ApiResponse<User>>(`/users/${id}`);

const createUser = (user: Omit<User, 'id'>) => apiClient.post<ApiResponse<User>>(`/users`, user);

const updateUser = (id: number, user: Partial<User>) => apiClient.put<ApiResponse<User>>(`/users/${id}`, user);

const deleteUser = (id: number) => apiClient.delete<ApiResponse<null>>(`/users/${id}`);

const userService = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};

export default userService;
