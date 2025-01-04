const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const getDueDisplay = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    const diff = Math.floor((due - now) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return 'Overdue';
    if (diff === 0) return 'Due today';
    if (diff === 1) return 'Due tomorrow';
    return `Due in ${diff}d`;
};

export const taskCard = (id, title, desc, deadline, created_at, assignee, tag, category) => {    
    const element = document.createElement('div');
    element.className = 'tasks bg-gray-900/50 border border-purple-500/10 hover:border-purple-500/30 rounded-sm p-4 transition-all cursor-pointer';
    element.dataset.id = id;

    console.log(assignee);
    

    const formattedCreatedDate = formatDate(created_at);
    const dueDisplay = getDueDisplay(deadline);
    
    element.innerHTML = `
        <!-- Task CARD -->
        <div class="flex justify-between items-start mb-2">
            <span class="text-md font-medium text-purple-400">${title}</span>
            <div class="flex gap-2">
                <button
                    class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-sm hover:bg-blue-500/20"
                    >Edit</button>
                <button
                    class="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-sm hover:bg-red-500/20"
                    >Delete</button>
            </div>
        </div>
        <!-- Category & Tags -->
        <div class="flex flex-wrap gap-2 mb-3">
            ${category ? `<span class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-sm">${category}</span>` : ''}
            ${tag ? tag.map(t => `<span class="text-xs px-2 py-1 bg-gray-500/10 text-gray-300 rounded-sm">#${t}</span>`).join('') : ''}                                    
        </div>
        <!-- Description -->
        <p class="text-gray-300 text-md mb-3">${desc}</p>
        <!-- Task Meta -->
        <div class="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-300">
            <div class="flex items-center gap-1">
                <i class="far fa-calendar"></i>
                <span>Created: ${formattedCreatedDate}</span>
            </div>
        </div>
        <!-- Assignee -->
        <div class="flex items-center justify-between border-t border-purple-500/10 pt-3">
            <div class="flex items-center gap-2">
                <div 
                    class="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                    ${assignee ? assignee[0].charAt(0).toUpperCase() : '?'}
                </div>
                <span class="text-xs text-gray-300">${assignee || 'Unassigned'}</span>
            </div>
            <span class="text-xs text-gray-500">${dueDisplay}</span>
        </div>
    `;

    return element;
};