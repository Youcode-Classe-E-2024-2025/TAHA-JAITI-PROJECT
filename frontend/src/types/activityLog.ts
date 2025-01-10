export interface ActivityLog {
    id: number;
    project_id: number;
    user_id: number;
    action: string;
    details: string;
    created_at: string;
    name: string;
}