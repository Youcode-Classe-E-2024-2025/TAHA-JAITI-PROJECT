import apiClient from "@/api/apiClient";

const projectService = {
    getProjects: () => apiClient.get(`/projects`),
    getMyProjects: () => apiClient.get(`/projects/my`),
    getProjectById: (id: number) => apiClient.get(`/projects/${id}`),
}

export default projectService;