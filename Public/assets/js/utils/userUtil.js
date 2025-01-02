export const getUserRole = () => {
    return sessionStorage.getItem('role') ?? null;
};

export const getUserId = () => {
    return sessionStorage.getItem('id') ?? null;
}