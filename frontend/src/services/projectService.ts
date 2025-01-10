import apiClient from "@/api/apiClient";
import {CreateProject, Project} from "@/types/projects";
import ApiResponse from "@/types/api";
import { User } from "@/types/auth";

const getProjects = () => apiClient.get<ApiResponse<Project[]>>(`/projects`);

const getMyProjects = () => apiClient.get<ApiResponse<Project[]>>(`/projects/my`);

const getProjectById = (id: number) => apiClient.get<ApiResponse<Project>>(`/projects/${id}`);

const createProject = (project: CreateProject) => apiClient.post<ApiResponse<Project>>(`/projects`, project);

const updateProject = (id: number, project: Project) => apiClient.put<ApiResponse<Project>>(`/projects/${id}`, project);

const deleteProject = (id: number) => apiClient.delete<ApiResponse<null>>(`/projects/${id}`);

const getUsersAssignedToProject = (projectId: number) => apiClient.get<ApiResponse<User[]>>(`/projects/${projectId}/users`);

const assignUser = (payload: { user_ids: number[]; creator_id: number }) => 
    apiClient.post<ApiResponse<null>>(`/projects/assign`, payload);


const projectService = {
    getProjects,
    getMyProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getUsersAssignedToProject,
    assignUser
};

export default projectService;
