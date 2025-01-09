import apiClient from "@/api/apiClient";
import { Tag } from "@/types/tags";
import ApiResponse from "@/types/api";

const getTags = () => apiClient.get<ApiResponse<Tag[]>>(`/tags`);

const getTagById = (id: number) => apiClient.get<ApiResponse<Tag>>(`/tags/${id}`);

const createTag = (tag: Omit<Tag, 'id'>) => apiClient.post<ApiResponse<Tag>>(`/tags`, tag);

const updateTag = (id: number, tag: Tag) => apiClient.put<ApiResponse<Tag>>(`/tags/${id}`, tag);

const deleteTag = (id: number) => apiClient.delete<ApiResponse<null>>(`/tags/${id}`);

const tagService = {
    getTags,
    getTagById,
    createTag,
    updateTag,
    deleteTag
};

export default tagService;
