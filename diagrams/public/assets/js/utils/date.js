export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const fixDate = (data) => {
    return new Date(data).toISOString().split('T')[0];
}