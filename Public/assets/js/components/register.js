import axios from "axios";
import { loading } from "../utils/loading";
import { sweetAlert } from "../utils/sweetAlert";


export const registerForm = () => {
    const element = document.createElement('div');
    element.classList = 'h-full w-full flex items-center justify-center bg-transparent p-4';
    element.innerHTML = ` <div class="bg-gray-800/90 backdrop-blur-sm p-8 rounded-sm shadow-2xl w-full max-w-md border border-gray-700">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Create Account
                </h2>
                <p class="text-gray-400 mt-2">Join TASKFLOW to get started</p>
            </div>
    
            <form id="registerForm" class="space-y-6">
                <div class="space-y-1">
                    <label for="username" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-user mr-2 text-purple-400"></i>Username
                    </label>
                    <input type="text" id="username" name="username" required
                        class="input" 
                        placeholder="Choose a username"/>
                </div>
    
                <div class="space-y-1">
                    <label for="email" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-envelope mr-2 text-purple-400"></i>Email
                    </label>
                    <input type="email" id="email" name="email" required
                        class="input" 
                        placeholder="Enter your email"/>
                </div>
    
                <div class="space-y-1">
                    <label for="password" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-lock mr-2 text-purple-400"></i>Password
                    </label>
                    <input type="password" id="password" name="password" required
                        class="input" 
                        placeholder="Create a password"/>
                </div>

                <div class="space-y-1">
                    <label for="role" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-user mr-2 text-purple-400"></i>Role
                    </label>
                    <select class="input" name="role" id="roleselect">
                        <option value="member">Member</option>
                        <option value="chief">Chief</option>
                    </select>
                </div>
    
                <button type="submit" class="btn_primary w-full flex items-center justify-center gap-2">
                    <i class="fa-solid fa-user-plus"></i>
                    Create Account
                </button>
            </form>
    
            <div class="mt-8 text-center">
                <p class="text-gray-400">
                    Already have an account? 
                    <a href="/login" id="registerLink" class="text-purple-400 hover:text-purple-300 font-medium ml-1 transition-colors">
                        Sign in
                    </a>
                </p>
            </div>
        </div>`;

    const form = element.querySelector('#registerForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = new FormData(form);

        const load = new loading();
        load.start();

        await handleRegister(data);

        load.stop();
    });

    return element;
};

const handleRegister = async (data) => {
    const name = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const role = data.get('role');

    const nameRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ]+(?:[-'\s][a-zA-ZÀ-ÖØ-öø-ÿ]+)*$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    console.log(data);
    

    if (!nameRegex.test(name)){
        sweetAlert('Enter a valid name');
        return;
    }

    if (!emailRegex.test(email)) {
        sweetAlert('Enter a valid email');
        return;
    }

    if (password.length < 8) {
        sweetAlert('Password must be 8 characters long');
        return;
    }

    if (role !== 'chief' && role !== 'member'){        
        sweetAlert('Invalid role');
        return;
    }

    try {
        const respone = await axios.post('http://localhost/api/register',
            {name, email, password, role}
        )
    } catch (err){
        page('/404');
        throw err;
    }

}
