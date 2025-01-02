export const getUserRole = () => {
    return sessionStorage.getItem('role');
};

export const getUserId = () => {
    return sessionStorage.getItem('id');
}