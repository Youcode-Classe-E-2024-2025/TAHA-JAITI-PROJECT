import categoryService from "@/services/categorySerivce";
import taskService from "@/services/taskService";
import { User } from "@/types/auth";
import { Category } from "@/types/categories";
import { Task } from "@/types/task";
import { formatDate, getDueDisplay } from "@/util/formatDate";
import getPermissions from "@/util/getPerms";
import { marked } from "marked";


const taskCard = async (task: Task) => {
    const permissions = getPermissions();
    const element = document.createElement('div');
    element.className = 'tasks bg-gray-900/50 border border-purple-500/10 hover:border-purple-500/30 rounded-sm p-4 transition-all cursor-pointer';
    element.dataset.id = String(task.id);

    const assignee = await getUsers(task.id);
    const formatedDate = formatDate(task.created_at);
    const dueDisplay = getDueDisplay(task.deadline);

    const catRes = await categoryService.getCategoryById(task.category_id);
    const cats = catRes.data.data;

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

    const categoryMarkup = cats.name ? `<span class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-sm">${cats.name}</span>`
    : '';


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
            ${categoryMarkup}
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

    element.addEventListener('click', (e:Event) => {
        e.stopPropagation();
        openTaskModal(task, assignee || [], cats);
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
  
const openTaskModal = (task: Task, assignees: User[], category: Category) => {
    const getRandomColor = () => {
        const colors = ['#9333ea', '#3b82f6', '#ef4444', '#22c55e', '#f59e0b', '#ec4899'];
        return colors[Math.floor(Math.random() * colors.length)];
    };

    const renderAssignees = () => {
        if (!assignees.length) {
            return '<span class="text-sm text-gray-400">No assignees</span>';
        }

        const assigneesList = assignees.map(user => `
            <div class="flex items-center gap-2 text-sm text-gray-300">
                <div class="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-medium">
                    ${user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                </div>
                <span>${user.email}</span>
            </div>
        `).join('');

        return `<div class="space-y-2">${assigneesList}</div>`;
    };

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70';

    modal.innerHTML = `
        <div class="bg-gray-900 w-full max-w-2xl border border-gray-800">
            <!-- Header -->
            <div class="p-4 border-b border-gray-800">
                <h2 class="text-xl font-semibold text-white">
                    ${task.title}
                </h2>
            </div>

            <!-- Content -->
            <div class="p-4 space-y-4 max-h-[70vh] overflow-y-auto">
                <!-- Description -->
                <div>
                    <h3 class="text-sm font-medium text-gray-400 mb-2">Description</h3>
                    <div class="text-black bg-white p-2 overflow-auto">
                        ${marked.parse(task.description) || '<em class="text-gray-500">No description provided</em>'}
                    </div>
                </div>

                <!-- Metadata -->
                <div class="grid grid-cols-2 gap-4 text-sm text-gray-300">
                    <div class="flex items-center gap-2">
                        <span>Created: ${new Date(task.created_at).toLocaleDateString()}</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span>Deadline: ${task.deadline ? new Date(task.deadline).toLocaleDateString() : 'No deadline'}</span>
                    </div>
                </div>

                <!-- Category -->
                <div>
                    <h3 class="text-sm font-medium text-gray-400 mb-2">Category</h3>
                    ${category 
                        ? `<div class="inline-flex items-center gap-2 px-2 py-1 bg-gray-800 rounded">
                            <span class="w-2 h-2 rounded-full" style="background-color: ${getRandomColor()}"></span>
                            <span class="text-sm text-gray-300">${category.name}</span>
                           </div>`
                        : '<span class="text-sm text-gray-500">No category assigned</span>'
                    }
                </div>

                <!-- Assignees -->
                <div>
                    <h3 class="text-sm font-medium text-gray-400 mb-2">Assignees</h3>
                    ${renderAssignees()}
                </div>
            </div>

            <!-- Footer -->
            <div class="p-4 border-t border-gray-800 flex justify-end">
                <button 
                    type="button"
                    class="px-4 py-2 bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    `;

    const handleClose = () => {
        modal.remove();
        document.body.style.overflow = '';
    };

    const closeButton = modal.querySelector('button');
    closeButton?.addEventListener('click', handleClose);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            handleClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            handleClose();
        }
    });

    document.body.style.overflow = 'hidden';
    document.body.appendChild(modal);
};

export default taskCard;