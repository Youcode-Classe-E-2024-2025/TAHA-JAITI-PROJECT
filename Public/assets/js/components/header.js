import page from 'page';
import { getUserId } from '../utils/userUtil.js';

export const header = () => {
    const logged = getUserId();
    const isUserLoggedIn = logged !== null;

    const element = document.createElement('header');
    element.classList = 'bg-gradient-to-r from-gray-800 to-black';
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
                    <a href="/dashboard" data-ajax class="hover:text-white">Dashboard</a>
                    <a href="/projects" data-ajax class="hover:text-white">Projects</a>
                </div>

                <!-- Auth Buttons -->
                <div class="flex items-center space-x-3">
                    <a href="/login" data-ajax class="${!isUserLoggedIn ? 'flex' : 'hidden'} btn_primary bg-transparent">
                        Login
                    </a>
                    <a href="/signup" data-ajax class="${!isUserLoggedIn ? 'flex' : 'hidden'} btn_primary">
                        Sign up
                    </a>
                    <button id="logoutBtn" class="${isUserLoggedIn ? 'flex' : 'hidden'} btn_primary">
                        Log out
                    </button>
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
            handleLogout();
        });
    }

    return element;
};

const handleLogout = () => {
    sessionStorage.clear();
    page('/');
};
