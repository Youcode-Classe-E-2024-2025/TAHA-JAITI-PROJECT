import taskService from "@/services/taskService";
import { User } from "@/types/auth";
import { Task } from "@/types/task";
import { formatDate, getDueDisplay } from "@/util/formatDate";
import getPermissions from "@/util/getPerms";


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
        <!-- Description -->
        <p class="text-gray-300 text-md mb-3">${task.description || '<span class="text-gray-500 italic">No description provided</span>'}</p>
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

export default taskCard;