import apiClient from "@/api/apiClient";
import { Task, CreateTask, UpdateTask } from "@/types/task";
import ApiResponse from "@/types/api";
import { User } from "@/types/auth";

const taskService = {
    getTasks: () => apiClient.get<ApiResponse<Task[]>>('/tasks'),
    getTasksByProjectId: (id: number) => apiClient.get<ApiResponse<Task[]>>(`/tasks/project/${id}`),
    getTaskById: (id: number) => apiClient.get<ApiResponse<Task>>(`/tasks/${id}`),
    createTask: (task: CreateTask) => apiClient.post<ApiResponse<Task>>('/tasks', task),
    updateTask: (id: number, task: UpdateTask) => apiClient.put<ApiResponse<Task>>(`/tasks/${id}`, task),
    deleteTask: (id: number) => apiClient.delete<ApiResponse<null>>(`/tasks/${id}`),
    getUsers: (id: number) => apiClient.get<ApiResponse<User[]>>(`/tasks/${id}/assign`)
};

export default taskService;