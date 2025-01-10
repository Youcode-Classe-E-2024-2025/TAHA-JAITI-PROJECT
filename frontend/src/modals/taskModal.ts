import page from "page";
import categoryService from "@/services/categorySerivce";
import taskService from "@/services/taskService";
import userService from "@/services/userService";
import sweetAlert from "@/tools/sweetAlert";
import { Task } from "@/types/task";
import { fixDate } from "@/util/formatDate";
import { marked } from "marked";

const taskModal = async () => {
    const catResponse = await categoryService.getCategories();
    const cats = catResponse.data.data;

    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center p-4';

    modal.innerHTML = `
        <form id="formModal" class="bg-gray-900 rounded-sm w-full max-w-lg border border-purple-500/30 max-h-[90vh] flex flex-col">
            <div class="p-4 sm:p-6 border-b border-purple-500/20">
                <h2 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">Add Task</h2>
            </div>
            
            <div class="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
                <div class="space-y-2">
                    <label for="title" class="block text-sm font-medium text-purple-300">Task Title</label>
                    <input 
                        type="text" 
                        name="title" 
                        id="title" 
                        class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                        required
                    >
                </div>

                <div class="space-y-2">
                    <label for="description" class="block text-sm font-medium text-purple-300">Description</label>
                    <textarea 
                        name="description" 
                        id="description" 
                        rows="4" 
                        class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                        required
                    ></textarea>
                </div>

                <!-- Markdown Preview -->
                <div class="space-y-2">
                    <label class="block text-sm font-medium text-purple-300 list-disc">Preview</label>
                    <div id="markdownPreview" class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300"></div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div class="space-y-2">
                        <label for="status" class="block text-sm font-medium text-purple-300">Status</label>
                        <select 
                            name="status" 
                            id="status"
                            class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        >
                            <option value="todo">To Do</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    
                    <div class="space-y-2">
                        <label for="deadline" class="block text-sm font-medium text-purple-300">Deadline</label>
                        <input 
                            type="datetime-local" 
                            name="deadline" 
                            id="deadline"
                            class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        >
                    </div> 
                </div>

                    
                    <div class="space-y-2">
                        <label for="category" class="block text-sm font-medium text-purple-300">Category</label>
                        <select 
                            id="category" 
                            name="category"  
                            class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            ${cats ? cats.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('') : ''}
                        </select>
                    </div>
               
            </div>

            <div class="p-4 sm:p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40 mt-auto">
                <button 
                    type="button"
                    id="cancelBtn" 
                    class="px-4 sm:px-6 py-2 border border-purple-500/30 rounded-sm text-purple-300 hover:bg-purple-500/10 transition-all"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    class="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition-all"
                >
                    Add Task
                </button>
            </div>
        </form>
    `;

    return modal;
}


export const handleTask = async () => {
    const modal = await taskModal();
    document.body.appendChild(modal);

    const descInput = modal.querySelector('#description') as HTMLTextAreaElement;
    const markdownPrev = modal.querySelector('#markdownPreview') as HTMLDivElement;
    if (descInput && markdownPrev){
        descInput.addEventListener('input', async () => {
            const markdownText = descInput.value;
            markdownPrev.innerHTML = await  marked.parse(markdownText)
        })
    }
   

    const form = modal.querySelector('#formModal') as HTMLFormElement;

    const closebtn = modal.querySelector('#cancelBtn') as HTMLButtonElement;

    const closeModal = () => modal.remove();

    closebtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e: Event) => {
        if (e.target === modal) closeModal();
    })

    if (form) {
        form.addEventListener('submit', async (e: Event) => {
            e.preventDefault();

            const data = new FormData(form);
            const title = data.get('title') as string;
            const description = data.get('description') as string;
            const status = data.get('status') as 'todo' | 'in_progress' | 'completed';
            const deadline = data.get('deadline') as string;
            const cat_id = data.get('category') as string;

            const project_id = Number(window.location.pathname.split('/')[2]);
            const category_id = Number(cat_id);

            try {
                const response = await taskService.createTask(
                    {title, description, status, deadline, project_id, category_id});

                if (response.status === 200){
                    closeModal();
                    sweetAlert(response.data.message);
                    page(`/projects/${project_id}`);
                } else {
                    console.log('error');
                }
                
            } catch (err){
                sweetAlert('An error occured. Please try again');
                page('/404');
            }
        })
    }
}

export const ediTaskModel = async (task: Task) => {
    const response = await userService.getUsers();
    const users = response.data.data;

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center p-4 z-50';

    const modalContent = document.createElement('form');
    modalContent.id = 'editTaskForm';
    modalContent.className = 'bg-gray-900 rounded-sm w-full max-w-lg border border-purple-500/30 max-h-[90vh] flex flex-col';

    modalContent.innerHTML = `
        <div class="p-4 sm:p-6 border-b border-purple-500/20">
            <h2 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">Edit Task</h2>
        </div>
        
        <div class="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
            <div class="space-y-2">
                <label for="taskTitle" class="block text-sm font-medium text-purple-300">Task Title</label>
                <input 
                    type="text" 
                    id="taskTitle" 
                    value="${task.title}" 
                    class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent" 
                    required
                >
            </div>

            <div class="space-y-2">
                <label for="taskDescription" class="block text-sm font-medium text-purple-300">Description</label>
                <textarea 
                    id="taskDescription" 
                    rows="4" 
                    class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent">${task.description || ''}</textarea>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="space-y-2">
                    <label for="taskDeadline" class="block text-sm font-medium text-purple-300">Deadline</label>
                    <input 
                        type="date" 
                        id="taskDeadline" 
                        value="${fixDate(task.deadline)}" 
                        class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                </div>

                <div class="space-y-2">
                    <label for="taskAssignees" class="block text-sm font-medium text-purple-300">Assignees</label>
                    <select 
                        id="taskAssignees" 
                        class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        multiple
                    >
                    ${users.map(user =>
        `<option value="${user.id}">${user.name}</option>`
    ).join('')}
                    </select>
                </div>
            </div>
        </div>

        <div class="p-4 sm:p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40 mt-auto">
            <button 
                type="button"
                id="cancelEdit" 
                class="px-4 sm:px-6 py-2 border border-purple-500/30 rounded-sm text-purple-300 hover:bg-purple-500/10 transition-all"
            >
                Cancel
            </button>
            <button 
                type="submit"
                class="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition-all"
            >
                Save
            </button>
        </div>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    const closeModal = () => {
        modalOverlay.remove();
    }

    const cancelBtn = modalContent.querySelector('#cancelEdit') as HTMLButtonElement;
    if (cancelBtn) {
        cancelBtn.addEventListener('click', (e: Event) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
}