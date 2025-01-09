import authService from "@/services/authService";
import Loading from "@/tools/loading";
import sweetAlert from "@/tools/sweetAlert";
import page from "page";

export const registerPage = () => {
    const element = document.createElement('div');
    element.className = 'h-full w-full flex items-center justify-center bg-transparent p-4';
    element.innerHTML = ` <div class="bg-gray-800/90 backdrop-blur-sm p-8 rounded-sm shadow-2xl w-full max-w-md border border-gray-700">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent">
                    Create Account
                </h2>
                <p class="text-gray-400 mt-2">Join TASKFLOW to get started</p>
            </div>
    
            <form id="registerForm" class="space-y-6">
                <div class="space-y-1">
                    <label for="name" class="block text-sm font-medium text-gray-300">
                        <i class="fa-regular fa-user mr-2 text-purple-400"></i>name
                    </label>
                    <input type="text" id="name" name="name" required
                        class="input" 
                        placeholder="Choose a name"/>
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
                        <option value="3">Member</option>
                        <option value="2">Chief</option>
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

    const form = element.querySelector('#registerForm') as HTMLFormElement;

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
    
            const data = new FormData(form);
            const name = data.get('name') as string;
            const email = data.get('email') as string;
            const passwrod = data.get('password') as string;
            const role = data.get('role') as string;
            
            Loading.start();

            await handleRegister(name, email, passwrod, Number(role));

        });
    }

    return element;
};

const handleRegister = async (name: string, email: string, password :string, role: number) => {
    try {

        const response = await authService.register(name, email, password, role);

        if (response.status = 200){
            sweetAlert("User registered successfully");
            page('/login');
            Loading.stop();
        }

    } catch (err){
        sweetAlert('An unexpected error happened');
        page('/404');
    }
}