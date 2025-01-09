import apiClient from "@/api/apiClient";
import { Category } from "@/types/categories";
import ApiResponse from "@/types/api";

const getCategories = () => apiClient.get<ApiResponse<Category[]>>(`/categories`);

const getCategoryById = (id: number) => apiClient.get<ApiResponse<Category>>(`/categories/${id}`);

const createCategory = (category: Omit<Category, 'id'>) => apiClient.post<ApiResponse<Category>>(`/categories`, category);

const updateCategory = (id: number, category: Category) => apiClient.put<ApiResponse<Category>>(`/categories/${id}`, category);

const deleteCategory = (id: number) => apiClient.delete<ApiResponse<null>>(`/categories/${id}`);

const categoryService = {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};

export default categoryService;
