interface Project {
    id: number;
    name: string;
    description: string;
    deadline: string;
    created_at: string;
    updated_at: string;
    creator_id: number;
    visibility: 'public' | 'private';
}

export default Project;