export interface Task {
    id: number,
    title: string,
    description: string,
    status: 'todo' | "in_progress" | "completed",
    deadline: string
    created_at: string,
    updated_at: string,
    project_id: number,
    category_id: number
}

export type CreateTask = Omit<Task, 'id' | 'created_at' | 'updated_at' >;

export type UpdateTask = Omit<Task, 'created_at' | 'updated_at'>;