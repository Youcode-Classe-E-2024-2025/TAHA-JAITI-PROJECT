import taskService from "@/services/taskService";
import { User } from "@/types/auth";
import { Task } from "@/types/task";
import { formatDate, getDueDisplay } from "@/util/formatDate";
import getPermissions from "@/util/getPerms";
import { marked } from "marked";


const taskCard = async (task: Task) => {
    const permissions = getPermissions();
    const element = document.createElement('div');
    element.className = 'tasks bg-gray-900/50 border border-purple-500/10 hover:border-purple-500/30 rounded-sm p-4 transition-all cursor-pointer';

    const assignee = await getUsers(task.id);
    const formatedDate = formatDate(task.created_at);
    const dueDisplay = getDueDisplay(task.deadline);

    const assigneeMarkup = assignee && assignee.length > 0
        ? assignee.slice(0, 3).map(a => `
            <div class="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                ${a.name.charAt(0).toUpperCase() || '?'}
            </div>
        `).join('') +
        (assignee.length > 3
            ? `<div class="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                +${assignee.length - 3}
            </div>`
            : '')
        : `<span class="text-xs text-gray-400">No assignees</span>`;


    const deleteMark = permissions.includes('delete_task') ? `
            <!-- Delete Button -->
            <button id="deleteTask" title="Delete task" class="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-sm hover:bg-red-500/20 flex items-center">
                <i class="fas fa-trash mr-1"></i>Delete
            </button>` : '';
    const editMark = permissions.includes('update_task') ?
        `<!-- Edit Button -->
            <button id='editTask' title="Edit task" class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-sm hover:bg-blue-500/20 flex items-center">
                <i class="fas fa-edit mr-1"></i>Edit
            </button>` : '';

    const addTagCat = permissions.includes('update_task') ?
        `<button id="addTag" title="Add Tag" class="text-xs px-2 py-1 bg-purple-500/10 text-purple-400 rounded-sm hover:bg-purple-500/20 flex items-center">
                <i class="fas fa-tag mr-1"></i>+ Tag
            </button>
            <button id="addCat" title="Add Category" class="text-xs px-2 py-1 bg-yellow-500/10 text-yellow-400 rounded-sm hover:bg-yellow-500/20 flex items-center">
                <i class="fas fa-list-alt mr-1"></i>+ Category
            </button>`: '';

    element.innerHTML = `
        <!-- Task CARD -->
        <div class="flex justify-between items-start mb-2">
            <span class="text-md font-medium text-purple-400">${task.title}</span>
            <div data-admin class="flex gap-2">
            ${deleteMark}
            ${editMark}
            </div>
        </div>
        <!-- Category & Tags -->
        <div class="flex flex-wrap gap-2 mb-3">
            
        </div>
        <!-- Task Meta -->
        <div class="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-300">
            <div class="flex items-center gap-1">
                <i class="far fa-calendar"></i>
                <span>Created: ${formatedDate}</span>
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
            ${addTagCat}
        </div>
    `;

    element.addEventListener('click', () => {
        openTaskModal(task, assignee || []);
    });

    return element;
}

const getUsers = async (id: number) => {
    try {
        const response = await taskService.getUsers(id);
        const data = response.data;

        if (response.status === 200 && data) {
            return response.data.data as User[];
        }

    } catch (err) {
        console.log(err);

    }
}

const openTaskModal = (task: Task, assignees: User[]) => {
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center p-4 z-50';

    const assigneeMarkup = assignees && assignees.length > 0
        ? assignees.slice(0, 3).map(a => `
            <div class="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                ${a.name.charAt(0).toUpperCase() || '?'}
            </div>
        `).join('') +
        (assignees.length > 3
            ? `<div class="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                +${assignees.length - 3}
            </div>`
            : '')
        : `<span class="text-xs text-gray-400">No assignees</span>`;

    modal.innerHTML = `
        <div class="bg-gray-900 rounded-sm w-full max-w-2xl border border-purple-500/30 max-h-[90vh] flex flex-col">
            <!-- Modal Header -->
            <div class="p-4 sm:p-6 border-b border-purple-500/20">
                <h2 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">${task.title}</h2>
            </div>

            <!-- Modal Body -->
            <div class="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
                <!-- Description -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-purple-300">Description</label>
                    <div id="taskDescription" class="prose prose-invert text-gray-300">
                        ${marked.parse(task.description || '*No description provided*')}
                    </div>
                </div>

                <!-- Task Meta -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-300">
                    <div class="flex items-center gap-1">
                        <i class="far fa-calendar"></i>
                        <span>Created: ${formatDate(task.created_at)}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <i class="far fa-clock"></i>
                        <span>Deadline: ${getDueDisplay(task.deadline)}</span>
                    </div>
                </div>

                <!-- Assignees -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-purple-300">Assignees</label>
                    <div class="flex items-center gap-2">
                        ${assigneeMarkup}
                    </div>
                </div>
            </div>

            <!-- Modal Footer -->
            <div class="p-4 sm:p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40 mt-auto">
                <button 
                    id="closeModal" 
                    class="px-4 sm:px-6 py-2 border border-purple-500/30 rounded-sm text-purple-300 hover:bg-purple-500/10 transition-all"
                >
                    Close
                </button>
            </div>
        </div>
    `;

    // Add close button functionality
    const closeButton = modal.querySelector('#closeModal');
    if (closeButton) {
        closeButton.addEventListener('click', () => {
            modal.remove();
        });
    }

    // Add click outside to close functionality
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    document.body.appendChild(modal);
};

export default taskCard;