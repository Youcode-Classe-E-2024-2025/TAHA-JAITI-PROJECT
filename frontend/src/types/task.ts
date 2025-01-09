export interface Task {
    id: number,
    title: string,
    description: string,
    status: 'todo' | "in_progress" | "completed",
    created_at: string,
    updated_at: string,
    project_id: number,
    category_id: number
}

export type CreateTask = Omit<Task, 'id'>;

export type UpdateTask = Omit<Task, 'created_at' | 'updated_at'>;