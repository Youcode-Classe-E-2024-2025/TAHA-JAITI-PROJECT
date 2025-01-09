import apiClient from "@/api/apiClient";
import Project from "@/types/projects";
import ApiResponse from "@/types/api";

const projectService = {
    getProjects: () => apiClient.get<ApiResponse<Project[]>>(`/projects`),
    getMyProjects: () => apiClient.get<ApiResponse<Project[]>>(`/projects/my`),
    getProjectById: (id: number) => apiClient.get<ApiResponse<Project>>(`/projects/${id}`),
}

export default projectService;
