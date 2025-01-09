import apiClient from "@/api/apiClient";
import Project from "@/types/projects";
import ApiResponse from "@/types/api";
import { User } from "@/types/auth";

const getProjects = () => apiClient.get<ApiResponse<Project[]>>(`/projects`);

const getMyProjects = () => apiClient.get<ApiResponse<Project[]>>(`/projects/my`);

const getProjectById = (id: number) => apiClient.get<ApiResponse<Project>>(`/projects/${id}`);

const createProject = (project: Omit<Project, 'id'>) => apiClient.post<ApiResponse<Project>>(`/projects`, project);

const updateProject = (id: number, project: Project) => apiClient.put<ApiResponse<Project>>(`/projects/${id}`, project);

const deleteProject = (id: number) => apiClient.delete<ApiResponse<null>>(`/projects/${id}`);

const getUsersAssignedToProject = (projectId: number) => apiClient.get<ApiResponse<User[]>>(`/projects/${projectId}/users`);

const projectService = {
    getProjects,
    getMyProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getUsersAssignedToProject
};

export default projectService;
