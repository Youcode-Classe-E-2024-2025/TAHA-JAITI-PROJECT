import { atom } from "nanostores";

export const userId = atom(null);
export const userRole = atom(null);

export const setUser = (id, role) => {
    userId.set(id);
    userRole.set(role);
};

export const clearUser = () => {
    userId.set(null);
    userRole.set(null);
};
