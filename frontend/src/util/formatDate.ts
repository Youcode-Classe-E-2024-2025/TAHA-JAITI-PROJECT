export const getDueDisplay = (deadline: string): string => {
    const now = new Date();
    const due = new Date(deadline);

    if (isNaN(due.getTime())) {
        return 'Invalid date';
    }

    now.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    const diff = Math.floor((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diff < 0) return 'Overdue';
    if (diff === 0) return 'Due today';
    if (diff === 1) return 'Due tomorrow';
    return `Due in ${diff} day${diff > 1 ? 's' : ''}`;
};


export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const fixDate = (data: string) => {
    return new Date(data).toISOString().split('T')[0];
};