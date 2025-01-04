export const editTask = (task) => {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    const modalContent = document.createElement('div');
    modalContent.className = 'bg-gray-800 p-6 rounded-lg shadow-lg w-[90%] max-w-lg';

    modalContent.innerHTML = `
        <h2 class="text-xl font-bold text-white mb-4">Edit Task</h2>
        <form id="editTaskForm" class="space-y-4">
            <!-- Task Title -->
            <div>
                <label for="taskTitle" class="block text-sm font-medium text-gray-400">Title</label>
                <input type="text" id="taskTitle" value="${task.title}" 
                    class="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-900 text-white" required>
            </div>
            
            <!-- Task Description -->
            <div>
                <label for="taskDescription" class="block text-sm font-medium text-gray-400">Description</label>
                <textarea id="taskDescription" rows="3" 
                    class="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-900 text-white">${task.description || ''}</textarea>
            </div>
            
            <!-- Deadline -->
            <div>
                <label for="taskDeadline" class="block text-sm font-medium text-gray-400">Deadline</label>
                <input type="date" id="taskDeadline" value="${task.deadline || ''}" 
                    class="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-900 text-white">
            </div>
            
            <!-- Assignees -->
            <div>
                <label for="taskAssignees" class="block text-sm font-medium text-gray-400">Assignees</label>
                <input type="text" id="taskAssignees" value="${task.assignee_names?.join(', ') || ''}" 
                    class="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    placeholder="Enter assignees separated by commas">
            </div>
            
            <!-- Tags -->
            <div>
                <label for="taskTags" class="block text-sm font-medium text-gray-400">Tags</label>
                <input type="text" id="taskTags" value="${task.tag_names?.join(', ') || ''}" 
                    class="w-full mt-1 p-2 border border-gray-600 rounded bg-gray-900 text-white"
                    placeholder="Enter tags separated by commas">
            </div>
            
            <!-- Save Button -->
            <div class="flex justify-end gap-2">
                <button type="button" id="cancelEdit" 
                    class="btn_second">Cancel</button>
                <button type="submit" 
                    class="btn_primary">Save</button>
            </div>
        </form>
    `;

    modalOverlay.appendChild(modalContent);
    document.body.appendChild(modalOverlay);
};
