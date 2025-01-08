import axios from "axios";
import page from "page";
import { sweetAlert } from "../utils/sweetAlert";
import { getProjectUsers, getUsers } from "../api/users";
import { userId } from "../utils/userUtil";
import { getCategories } from '../api/category.js';
import { getTags } from "../api/tags.js";

const categoryModal = () => {
    const modal = document.createElement('div');
    modal.className = `fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center`
    modal.innerHTML = `<form id='formModal' class="bg-gray-900 rounded-sm w-full max-w-md mx-4 border border-purple-500/30">
                        <div class="p-6 border-b border-purple-500/20">
                            <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">Add Category</h2>
                        </div>
                        <div class="p-6 space-y-6 bg-gradient-to-b from-gray-900 to-black">
                            <div class="space-y-2">
                            <label for="category" class="block text-sm font-medium text-purple-300">Category Name</label>
                            <input type="text" name="category" class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            </div>
                        </div>
                        <div class="p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40">
                            <button id='closeBtn' class="px-6 py-2 border border-purple-500/30 rounded-sm text-purple-300 hover:bg-purple-500/10 transition-all">Cancel</button>
                            <button class="px-6 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition-all">Add Category</button>
                        </div>
                        </form>`;

    return modal;
};

export const handleCategory = () => {
    const modal = categoryModal();
    document.body.appendChild(modal);

    const form = modal.querySelector('#formModal');
    const closeBtn = modal.querySelector('#closeBtn');

    const closeModal = () => {
        modal.remove();
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const name = data.get('category');

        if (name) {
            try {
                const response = await axios.post(
                    'http://localhost/api/category',
                    { name },
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    sweetAlert('Category created', 'success');
                } else {
                    sweetAlert('Creation failed', 'error');
                }

                closeModal();
            } catch (err) {
                sweetAlert('An error occurred. Please try again.');
                page('/404');
            }
        } else {
            sweetAlert('Please enter a valid category name');
        }
    });

};

const tagModal = () => {
    const modal = document.createElement('div');
    modal.className = `fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center`
    modal.innerHTML = `<form id='formModal' class="bg-gray-900 rounded-sm w-full max-w-md mx-4 border border-purple-500/30">
                        <div class="p-6 border-b border-purple-500/20">
                            <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">Add Tag</h2>
                        </div>
                        <div class="p-6 space-y-6 bg-gradient-to-b from-gray-900 to-black">
                            <div class="space-y-2">
                            <label for="tag" class="block text-sm font-medium text-purple-300">Tag Name</label>
                            <input type="text" name="tag" class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            </div>
                        </div>
                        <div class="p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40">
                            <button id='closeBtn' class="px-6 py-2 border border-purple-500/30 rounded-sm text-purple-300 hover:bg-purple-500/10 transition-all">Cancel</button>
                            <button class="px-6 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition-all">Add Tag</button>
                        </div>
                        </form>`;

    return modal;
};

export const handleTag = () => {
    const modal = tagModal();
    document.body.appendChild(modal);

    const form = modal.querySelector('#formModal');
    const closeBtn = modal.querySelector('#closeBtn');

    const closeModal = () => {
        modal.remove();
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const name = data.get('tag');

        if (name) {
            try {
                const response = await axios.post(
                    'http://localhost/api/tag',
                    { name },
                    { withCredentials: true }
                );

                if (response.status === 200) {
                    sweetAlert('Tag created', 'success');
                } else {
                    sweetAlert('Tag failed', 'error');
                }

                closeModal();
            } catch (err) {
                sweetAlert('An error occurred. Please try again.');
                page('/404');
            }
        } else {
            sweetAlert('Please enter a valid Tag name');
        }
    });

};

const projectModal = async () => {
    const assignees = await getUsers();
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/10 backdrop-blur-lg flex items-center justify-center';
    
    modal.innerHTML = `
        <form id="formModal" class="bg-gray-900 rounded-sm w-full max-w-md mx-4 border border-purple-500/30">
            <div class="p-6 border-b border-purple-500/20">
                <h2 class="text-2xl font-bold bg-gradient-to-r from-purple-300 to-white bg-clip-text text-transparent">Add Project</h2>
            </div>
            
            <div class="p-6 space-y-6 bg-gradient-to-b from-gray-900 to-black">
                <div class="space-y-2">
                    <label for="name" class="block text-sm font-medium text-purple-300">Project Name</label>
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
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

                <div class="grid grid-cols-2 gap-2">
                    <div class="space-y-2">
                        <label for="is_public" class="block text-sm font-medium text-purple-300">Visibility</label>
                        <select 
                            name="is_public" 
                            id="is_public"
                            class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        >
                            <option value="true">Public</option>
                            <option value="false">Private</option>
                        </select>
                    </div>
                    
                    <div class="space-y-2">
                        <label for="deadline" class="block text-sm font-medium text-purple-300">Deadline</label>
                        <input 
                            type="date" 
                            name="deadline" 
                            id="deadline"
                            class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        >
                    </div>
                </div>

                <div class="space-y-2">
                    <label for="users" class="block text-sm font-medium text-purple-300">Assign Members</label>
                    <select 
                        id="assigned_members" 
                        name="users" 
                        multiple 
                        class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                        ${assignees.map(user => `<option value="${user.id}">${user.name}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div class="p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40">
                <button 
                    type="button"
                    id="closeBtn" 
                    class="px-6 py-2 border border-purple-500/30 rounded-sm text-purple-300 hover:bg-purple-500/10 transition-all"
                >
                    Cancel
                </button>
                <button 
                    type="submit"
                    class="px-6 py-2 bg-purple-600 text-white rounded-sm hover:bg-purple-700 transition-all"
                >
                    Add Project
                </button>
            </div>
        </form>
    `;
    
    return modal;
};

export const handleProject = async () => {
    const modal = await projectModal();
    document.body.appendChild(modal);

    const form = modal.querySelector('#formModal');

    const closeBtn = modal.querySelector('#closeBtn');
    const closeModal = () => {
        modal.remove();
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const name = data.get('name');
        const description = data.get('description');
        const is_public = data.get('is_public');
        const deadline = data.get('deadline');
        const creator = userId.get();
        const users = data.getAll('users');

        try {
            const response = await axios.post('http://localhost/api/project', {
                name, description, is_public, deadline, creator, users
            });

            if (response.status === 200) {
                sweetAlert('Project Created');
                page('/projects');
            } else {
                console.log('error');
            }

            closeModal();
        } catch (err) {
            sweetAlert('An error occurred. Please try again.');
            page('/404');
        }

    });

};

const taskModal = async () => {
    const projectId = window.location.pathname.split('/')[2];

    const categories = await getCategories();
    const tags = await getTags();
    const users = await getProjectUsers(projectId);
    
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
                        <label for="assignees" class="block text-sm font-medium text-purple-300">Assignees</label>
                        <select 
                            id="assignees" 
                            name="assignees" 
                            multiple 
                            class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        >
                            ${users ? users.map(user => `<option value="${user.id}">${user.name}</option>`).join('') : ''}
                        </select>
                        <p class="text-xs text-purple-300/70">Hold Ctrl/Cmd to select multiple assignees</p>
                    </div>
               
            </div>

            <div class="p-4 sm:p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40 mt-auto">
                <button 
                    type="button"
                    id="closeBtn" 
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
};

export const handleTask = async () => {
    const modal = await taskModal();
    document.body.appendChild(modal);

    const form = modal.querySelector('#formModal');

    const closeBtn = modal.querySelector('#closeBtn');
    const closeModal = () => {
        modal.remove();
    };

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(form);
        const title = data.get('title');
        const description = data.get('description');
        const status = data.get('status');
        const deadline = data.get('deadline');
        const assignees = data.getAll('assignees');

        const project_id = window.location.pathname.split('/')[2];

        try {
            const response = await axios.post('http://localhost/api/task', {
                title, description, status, deadline, assignees, project_id
            });

            if (response.status === 200) {
                sweetAlert('Task Created');
                page(`/projects/${project_id}`);
            } else {
                console.log('error');
            }

            closeModal();
        } catch (err) {
            sweetAlert('An error occurred. Please try again.');
            page('/404');
        }
    });
};