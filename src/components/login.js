import { apiRequest } from "../api.js";
import { sweetAlert } from "../utils/sweetAlert.js";

export const loginForm = () => {
    const element = document.createElement('div');
    element.classList = 'h-full w-full flex items-center justify-center bg-transparent p-4';
    element.innerHTML = `<div class="bg-gray-800/90 backdrop-blur-sm p-8 rounded-sm shadow-2xl w-full max-w-md border border-gray-700">
                <div class="text-center mb-8">
                    <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                        Welcome Back
                    </h2>
                    <p class="text-gray-400 mt-2">Sign in to continue to TASKFLOW</p>
                </div>
        
                <form id="loginForm" class="space-y-6">
                    <div class="space-y-1">
                        <label for="email" class="block text-sm font-medium text-gray-300">
                            <i class="fa-regular fa-envelope mr-2 text-purple-400"></i>Email
                        </label>
                        <input type="email" id="email" name="email" required class="input" placeholder="Enter your email" />
                    </div>
        
                    <div class="space-y-1">
                        <label for="password" class="block text-sm font-medium text-gray-300">
                            <i class="fa-regular fa-lock mr-2 text-purple-400"></i>Password
                        </label>
                        <input type="password" id="password" name="password" required class="input"
                            placeholder="Enter your password" />
                    </div>
        
                    <button data-auth type="submit" class="btn_primary w-full flex items-center justify-center gap-2">
                        <i class="fa-solid fa-right-to-bracket"></i>
                        Sign In
                    </button>
                </form>
        
                <div class="mt-8 text-center">
                    <p class="text-gray-400">
                        Don't have an account?
                        <a href="/register" id="loginLink"
                            class="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors">
                            Create account
                        </a>
                    </p>
                </div>
            </div>`

    const form = element.querySelector('#loginForm');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const data = new FormData(form);
        
        handleLogin(data);
    })

    return element;
};

const handleLogin = async (data) => {
    const email = data.get('email');
    const password = data.get('password');

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    
}