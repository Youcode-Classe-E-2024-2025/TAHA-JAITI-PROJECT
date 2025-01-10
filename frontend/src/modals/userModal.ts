import taskService from "@/services/taskService";
import userService from "@/services/userService";
import sweetAlert from "@/tools/sweetAlert";
import { User } from "@/types/auth";

export const openAssignUserModal = async (taskId: number): Promise<void> => {
    try {
        const response = await userService.getUsers();
        const users = response.data.data as User[];

        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70';

        modal.innerHTML = `
            <div class="bg-gray-900 w-full max-w-2xl border border-gray-800 rounded-lg">
                <!-- Header -->
                <div class="p-4 border-b border-gray-800">
                    <h2 class="text-xl font-semibold text-white">Assign Users</h2>
                </div>

                <!-- Content -->
                <div class="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                    ${users.map(user => `
                        <div class="flex items-center justify-between">
                            <div class="flex items-center gap-2">
                                <div class="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center font-medium">
                                    ${user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                </div>
                                <span class="text-gray-300">${user.name}</span>
                            </div>
                            <button 
                                class="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-sm hover:bg-purple-500/20"
                                data-user-id="${user.id}"
                            >
                                Assign
                            </button>
                        </div>
                    `).join('')}
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

        const closeButton = modal.querySelector('button') as HTMLButtonElement;
        closeButton.addEventListener('click', () => {
            modal.remove();
            document.body.style.overflow = '';
        });

        modal.querySelectorAll('button[data-user-id]').forEach((button) => {
            button.addEventListener('click', async (e) => {
                const user_id = (e.target as HTMLElement).dataset.userId;
                if (user_id) {
                    await taskService.assignUser(taskId, Number(user_id));
                    sweetAlert('User assigned successfully');
                    modal.remove();
                    document.body.style.overflow = '';
                }
            });
        });

        document.body.style.overflow = 'hidden';
        document.body.appendChild(modal);
    } catch (error) {
        console.error('Error fetching users:', error);
        sweetAlert('Failed to fetch users');
    }
};