import { atom } from "nanostores";

const storedUserId = localStorage.getItem("userId");
const storedUserRole = localStorage.getItem("userRole");

export const userId = atom(storedUserId ? JSON.parse(storedUserId) : null);
export const userRole = atom(storedUserRole ? JSON.parse(storedUserRole) : 'guest');

userId.subscribe((value) => {
    localStorage.setItem("userId", JSON.stringify(value));
});
userRole.subscribe((value) => {
    localStorage.setItem("userRole", JSON.stringify(value));
});

export const setUser = (id, role) => {
    userId.set(id);
    userRole.set(role);
};

export const clearUser = () => {
    userId.set(null);
    userRole.set('guest');
};


export const isLogged = () => {    
    return userId.get() && userRole.get();
}