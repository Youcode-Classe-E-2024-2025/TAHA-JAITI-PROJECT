import { getUsers } from "../api/users";
import { editTaskDB } from "../api/tasks";
import { sweetAlert } from "../utils/sweetAlert";
import { fixDate } from "../utils/date";
import { addTagDB, getTags } from "../api/tags";
import { getCategories, addCatDB } from "../api/category";

export const editTaskModal = async (task) => {
    const users = await getUsers();

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
    };

    modalContent.querySelector('#cancelEdit').addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    modalContent.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedTask = {
            id: task.id,
            title: document.getElementById('taskTitle').value,
            description: document.getElementById('taskDescription').value,
            deadline: document.getElementById('taskDeadline').value,
            status: task.status,
            assignees: Array.from(document.getElementById('taskAssignees').selectedOptions).map(option => option.value),
        };

        if (!updatedTask.title.trim()) {
            sweetAlert('Task title is required.');
            return;
        }

        if (!updatedTask.description.trim()) {
            sweetAlert('Task description is required.');
            return;
        }

        if (!updatedTask.deadline.trim()) {
            sweetAlert('Task deadline is required.');
            return;
        }

        if (updatedTask.assignees.length === 0) {
            sweetAlert('At least one assignee is required.');
            return;
        }

        editTaskDB(updatedTask);

        modalOverlay.remove();
    });
};

export const addTagModal = async (task) => {
    const tags = await getTags();

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center p-4 z-50';

    const modalContent = document.createElement('form');
    modalContent.id = 'addTagForm';
    modalContent.className = 'bg-gray-900 rounded-sm w-full max-w-lg border border-purple-500/30 max-h-[90vh] flex flex-col';

    modalContent.innerHTML = `
                <div class="p-4 sm:p-6 border-b border-purple-500/20">
                    <h2 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">Add Tags to Task</h2>
                </div>

                <div class="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
                    <div class="space-y-2">
                        <label for="taskTags" class="block text-sm font-medium text-purple-300">Select Tags</label>
                        <select id="taskTags"
                            name"taskTags" 
                            class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            multiple
                        >
                            ${tags.map(t => `<option value="${t.id}">${t.name}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div class="p-4 sm:p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40 mt-auto">
                    <button 
                        type="button"
                        id="cancelAddTag" 
                        class="px-4 sm:px-6 py-2 border border-purple-500/30 rounded-sm text-purple-300 hover:bg-purple-500/10 transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        class="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition-all"
                    >
                        Add Tags
                    </button>
                </div>
            `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    const closeModal = () => {
        modalOverlay.remove();
    };

    modalContent.querySelector('#cancelAddTag').addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    modalContent.addEventListener('submit', (e) => {
        e.preventDefault();

        const selectedTags = Array.from(document.getElementById('taskTags').selectedOptions).map(option => parseInt(option.value));

        if (selectedTags.length === 0) {
            sweetAlert('At least one tag is required');
            return;
        }


        addTagDB(selectedTags, task.id);

        modalOverlay.remove();
    });

};

export const addCatModal = async (task) => {
    const category = await getCategories();
    console.log(category);
    

    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center p-4 z-50';

    const modalContent = document.createElement('form');
    modalContent.id = 'addCatForm';
    modalContent.className = 'bg-gray-900 rounded-sm w-full max-w-lg border border-purple-500/30 max-h-[90vh] flex flex-col';

    modalContent.innerHTML = `
                <div class="p-4 sm:p-6 border-b border-purple-500/20">
                    <h2 class="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">Add a category</h2>
                </div>

                <div class="p-4 sm:p-6 space-y-4 sm:space-y-6 bg-gradient-to-b from-gray-900 to-black overflow-y-auto">
                    <div class="space-y-2">
                        <label for="categories" class="block text-sm font-medium text-purple-300">Select a category</label>
                        <select id="categories"
                            name="categories" 
                            class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            ${category.map(cat => `<option value="${cat.id}">${cat.name}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div class="p-4 sm:p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40 mt-auto">
                    <button 
                        type="button"
                        id="cancelAddCat" 
                        class="px-4 sm:px-6 py-2 border border-purple-500/30 rounded-sm text-purple-300 hover:bg-purple-500/10 transition-all"
                    >
                        Cancel
                    </button>
                    <button 
                        type="submit"
                        class="px-4 sm:px-6 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition-all"
                    >
                        Add Tags
                    </button>
                </div>
            `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);

    const closeModal = () => {
        modalOverlay.remove();
    };

    modalContent.querySelector('#cancelAddCat').addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    modalContent.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = new FormData(modalContent);
        const id = data.get('categories');

        console.log(id);
        

        if (!id){
            sweetAlert('Please select a category');
        }

        addCatDB(task.id, id);

        modalOverlay.remove();
    });

};
