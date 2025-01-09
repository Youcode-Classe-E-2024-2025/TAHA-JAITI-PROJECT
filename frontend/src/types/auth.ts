// types/auth.ts

export interface Token {
    token: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: number;
}

export interface Permission {
    id: number;
    name: string;
}
