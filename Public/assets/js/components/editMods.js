import { getUsers } from "../api/users";
import { editTaskDB } from "../api/tasks";

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
                        value="${task.deadline || ''}" 
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

    document.getElementById('cancelEdit').addEventListener('click', () => {
        modalOverlay.remove();
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
        
        editTaskDB(updatedTask);

        modalOverlay.remove();
    });
};