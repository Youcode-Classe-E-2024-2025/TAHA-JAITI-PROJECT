export interface task {
    id: number,
    title: string,
    description: string,
    status: 'todo' | "in_progress" | "completed",
    created_at: string,
    updated_at: string,
    project_id: number,
    category_id: number
}