export interface Project {
    id: number;
    name: string;
    description: string;
    deadline: string;
    created_at: string;
    updated_at: string;
    creator_id: number;
    visibility: 'public' | 'private';
}

export type CreateProject = Omit<Project, 'id' | 'created_at' | 'updated_at' >;
