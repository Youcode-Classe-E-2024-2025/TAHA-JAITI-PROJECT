import projectService from "@/services/projectService";
import userService from "@/services/userService";
import sweetAlert from "@/tools/sweetAlert";
import getUserId from "@/util/getUserId";
import page from "page";

const projectModal = async () => {
    const reponse = await userService.getUsers();
    const users = reponse.data.data;
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
                        <label for="visibility" class="block text-sm font-medium text-purple-300">Visibility</label>
                        <select 
                            name="visibility" 
                            id="visibility"
                            class="w-full px-4 py-2 bg-black/40 border border-purple-500/30 rounded-sm text-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            required
                        >
                            <option selected value="public">Public</option>
                            <option value="private">Private</option>
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
                        ${users.map(user => `<option value="${user.id}">${user.name}</option>`).join('')}
                    </select>
                </div>
            </div>

            <div class="p-6 border-t border-purple-500/20 flex justify-end space-x-4 bg-black/40">
                <button 
                    type="button"
                    id="cancelBtn" 
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

    const form = modal.querySelector('#formModal') as HTMLFormElement;

    const closeModal = () => {
        modal.remove();
    }

    const closeBtn = modal.querySelector('#cancelBtn') as HTMLButtonElement;

    closeBtn.addEventListener('click', () => closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    })

    if (form) {
        form.addEventListener('submit', async (e: Event) => {
            e.preventDefault();

            const data = new FormData(form);
            const name = data.get('name') as string;
            const description = data.get('description') as string; 
            const visibility = data.get('visibility') as 'public' | 'private';
            const deadline = data.get('deadline') as string;
            const creator_id = getUserId() ?? 1;
            const users = data.getAll('users');

            try {
                const reponse = await projectService.createProject({name, description, deadline, visibility, creator_id})

                if (reponse.status === 200){
                    sweetAlert('Project Created');
                    page('/projects');
                } else {
                    console.log(reponse.data.message);
                }

                closeModal();
            } catch (err){
                sweetAlert('An error occurred. Please try again.');
                console.log(err);
                
                page('/404');
            }

        });

        
    }
}