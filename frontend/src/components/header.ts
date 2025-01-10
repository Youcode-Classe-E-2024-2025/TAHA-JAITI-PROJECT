import { handleProject } from "@/modals/projectModal";
import Loading from "@/tools/loading";
import getPermissions from "@/util/getPerms";
import page from "page";

const header = () => {
    const permissions = getPermissions();
    const isLoggedIn = !!localStorage.getItem('token');
    
    const element = document.createElement('header');
    element.className = 'bg-gradient-to-r from-gray-800 to-black';
    element.innerHTML = `
            <nav class="max-w-7xl mx-auto px-4">
                <div class="flex items-center justify-between h-16">
                    <!-- Logo Area -->
                    <div class="flex items-center space-x-3 select-none">
                        <span class="text-xl font-bold text-white bg-purple-600 px-3 py-1 rounded-sm">T</span>
                        <span class="text-lg text-white font-bold">TASKFLOW</span>
                    </div>

                    <!-- Main Navigation -->
                    <div class="hidden md:flex items-center text-lg space-x-6">
                        <a href="/" data-ajax class="hover:text-white">Home</a>
                        ${permissions ? `<a href="/dashboard" data-ajax class="hover:text-white">Statistics</a>` : ''}
                        <a href="/projects" data-ajax class="hover:text-white">Projects</a>
                    </div>

                    <!-- Auth Buttons -->
                    <div class="flex items-center space-x-3">
                        ${permissions.includes('create_project') ? `<button id="newProject" class="btn_second bg-transparent">
                            + PROJECT
                        </button>` : ''}
                        ${!isLoggedIn? `<a href="/login" data-ajax class=" btn_primary bg-transparent">
                            Login
                        </a>` : ''}
                        ${!isLoggedIn ? `<a href="/signup" data-ajax class="btn_primary">
                            Sign up
                        </a>`: ''}
                        ${isLoggedIn ? `<button id="logoutBtn" class=" btn_primary">
                            Log out
                        </button>`: ''}
                    </div>
                </div>
            </nav>

            <!-- Minimal accent line -->
            <div class="h-[1px] bg-purple-600/30"></div>
        `;


        const logoutBtn = element.querySelector('#logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();

                Loading.start();
                
                handleLogout();

                Loading.stop();

            });
        }

        const addProject = element.querySelector('#newProject') as HTMLButtonElement;
        if (addProject){
            addProject.addEventListener('click', async () => {
                await handleProject()
            })
        }
    
    return element;
}

const handleLogout = () => {
    localStorage.clear();
    page('/login');
}


export default header;