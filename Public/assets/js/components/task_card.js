import { deleteTaskDB } from "../api/tasks.js";
import { editTaskModal, addTagModal, addCatModal } from "./editMods.js";
import { formatDate } from "../utils/date.js";


const getDueDisplay = (deadline) => {
    const now = new Date();
    const due = new Date(deadline);
    const diff = Math.floor((due - now) / (1000 * 60 * 60 * 24));
    
    if (diff < 0) return 'Overdue';
    if (diff === 0) return 'Due today';
    if (diff === 1) return 'Due tomorrow';
    return `Due in ${diff}d`;
};

export const taskCard = (task, isAdmin) => {    
    const element = document.createElement('div');
    element.className = 'tasks bg-gray-900/50 border border-purple-500/10 hover:border-purple-500/30 rounded-sm p-4 transition-all cursor-pointer';
    element.dataset.id = task.id;        

    const assignee = Array.isArray(task.assignee_names) ? task.assignee_names : [];
    const formattedCreatedDate = formatDate(task.created_at);
    const dueDisplay = getDueDisplay(task.deadline);

    const assigneeMarkup = assignee.length > 0 
        ? assignee.slice(0, 3).map(a => `
            <div class="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                ${a[0]?.charAt(0).toUpperCase() || '?'}
            </div>
        `).join('') + 
        (assignee.length > 3 
            ? `<div class="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                +${assignee.length - 3}
            </div>`
            : '')
        : `<span class="text-xs text-gray-400">No assignees</span>`;

    const tagsMarkup = Array.isArray(task.tag_names) && task.tag_names.length > 0
        ? task.tag_names.map(t => `
            <span class="text-xs px-2 py-1 bg-gray-500/10 text-gray-300 rounded-sm">#${t}</span>
        `).join('')
        : `<span class="text-xs text-gray-500 italic">No tags</span>`;

    const categoryMarkup = task.category_name 
        ? `<span class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-sm">${task.category_name}</span>`
        : '';

    const adminMarkup = isAdmin ? `
        <div data-admin class="flex gap-2">
            <!-- Edit Button -->
            <button id='editTask' title="Edit task" class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-sm hover:bg-blue-500/20 flex items-center">
                <i class="fas fa-edit mr-1"></i>Edit
            </button>
            <!-- Delete Button -->
            <button id="deleteTask" title="Delete task" class="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-sm hover:bg-red-500/20 flex items-center">
                <i class="fas fa-trash mr-1"></i>Delete
            </button>
        </div>
    ` : '';

    element.innerHTML = `
        <!-- Task CARD -->
        <div class="flex justify-between items-start mb-2">
            <span class="text-md font-medium text-purple-400">${task.title}</span>
            ${adminMarkup}
        </div>
        <!-- Category & Tags -->
        <div class="flex flex-wrap gap-2 mb-3">
            ${categoryMarkup}
            ${tagsMarkup}
        </div>
        <!-- Description -->
        <p class="text-gray-300 text-md mb-3">${task.description || '<span class="text-gray-500 italic">No description provided</span>'}</p>
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
                ${assigneeMarkup}
            </div>
            <span class="text-xs text-gray-500">${dueDisplay}</span>
        </div>

        <!-- Add Buttons -->
        <div data-admin class="flex justify-between items-center mt-3 gap-2">
            <button id="addTag" title="Add Tag" class="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-sm hover:bg-purple-500/20 flex items-center">
                <i class="fas fa-tag mr-1"></i>+ Tag
            </button>
            <button id="addCat" title="Add Category" class="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded-sm hover:bg-yellow-500/20 flex items-center">
                <i class="fas fa-list-alt mr-1"></i>+ Category
            </button>
        </div>
    `;

    if (isAdmin) {
        const editTask = element.querySelector('#editTask');
        editTask.addEventListener('click', (e) => {
            e.stopPropagation();
            editTaskModal(task);
        });

        const deleteTask = element.querySelector('#deleteTask');
        deleteTask.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTaskDB(task);
        });
    }

    const addTag = element.querySelector('#addTag');
    addTag.addEventListener('click', (e) => {
        e.stopPropagation();
        addTagModal(task);
    });

    const addCat = element.querySelector('#addCat');
    addCat.addEventListener('click', (e) => {
        e.stopPropagation();
        addCatModal(task);
    });

    return element;
};
