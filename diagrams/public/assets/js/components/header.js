import page from 'page';
import axios from 'axios';
import { userId, userRole, clearUser } from '../utils/userUtil.js';

import { sweetAlert } from '../utils/sweetAlert.js';
import { loading } from '../utils/loading.js';
import { handleProject } from './modals.js';

export const header = () => {
    const element = document.createElement('header');
    element.classList = 'bg-gradient-to-r from-gray-800 to-black';

    const updateHeader = () => {
        const loggedIn = userId.get() !== null;
        const isAdmin = userRole.get() === 'chief';

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
                        ${isAdmin ? `<a href="/dashboard" data-ajax class="hover:text-white">Statistics</a>` : ''}
                        <a href="/projects" data-ajax class="hover:text-white">Projects</a>
                    </div>

                    <!-- Auth Buttons -->
                    <div class="flex items-center space-x-3">
                        ${isAdmin ? `<button id="newProject" class="btn_second bg-transparent">
                            + PROJECT
                        </button>` : ''}
                        ${!loggedIn ? `<a href="/login" data-ajax class=" btn_primary bg-transparent">
                            Login
                        </a>` : ''}
                        ${!loggedIn ? `<a href="/signup" data-ajax class="btn_primary">
                            Sign up
                        </a>`: ''}
                        ${loggedIn ? `<button id="logoutBtn" class=" btn_primary">
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
            logoutBtn.addEventListener('click', async (e) => {
                e.preventDefault();

                const load = new loading();
                try {
                    load.start();
                    await handleLogout();
                    load.stop();
                } catch (error) {
                    load.stop();
                    console.error('Logout failed:', error);
                }
            });
        }

        const newBtn = element.querySelector('#newProject');
        if (newBtn) {
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                handleProject();
            });
        }
    };

    updateHeader();

    userId.subscribe(updateHeader);
    userRole.subscribe(updateHeader);

    return element;
};

const handleLogout = async () => {
    try {

        const response = await axios.get('http://localhost/api/logout');

        if (response.status === 200) {
            page('/');
        } else {
            sweetAlert('An error occured while logging out' + response.data.message)
        }

        clearUser();
    } catch (err) {
        page('/404');
        throw err;
    }
};
