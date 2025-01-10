import apiClient from '@/api/apiClient';
import { ActivityLog } from '@/types/activityLog';

export const fetchActivityLog = async (projectId: number): Promise<ActivityLog[]> => {
    try {
        const response = await apiClient.get<{ data: ActivityLog[] }>(`/projects/${projectId}/timeline`);
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch activity log:', error);
        return [];
    }
};