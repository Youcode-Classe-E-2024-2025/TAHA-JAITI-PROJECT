import authService from "@/services/authService";

export const loginPage = () => {
    const element = document.createElement('div');
    element.className = `h-full w-full flex items-center justify-center bg-transparent p-4`;
    element.innerHTML = `<div class="bg-gray-800/90 backdrop-blur-sm p-8 rounded-sm shadow-2xl w-full max-w-md border border-gray-700 relative">
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
                        <input type="email" id="email" name="email" class="input" placeholder="Enter your email" />
                    </div>
        
                    <div class="space-y-1">
                        <label for="password" class="block text-sm font-medium text-gray-300">
                            <i class="fa-regular fa-lock mr-2 text-purple-400"></i>Password
                        </label>
                        <input type="password" id="password" name="password" class="input"
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
            </div>`;

    const form = element.querySelector('#loginForm') as HTMLFormElement;
    if (form) {
        form.addEventListener('submit', async (e: Event) => {
            e.preventDefault();

            const data = new FormData(form);
            const email = data.get('email') as string;
            const password = data.get('password') as string;

            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!emailRegex.test(email)) {
                alert('Enter a valid email');
                return;
            }

            if (password.length < 8) {
                alert('Password must be 8 characters long');
                return;
            }

            await handleLogin(email, password);

        });
    }

    return element;
}

const handleLogin = async (email: string, password: string) => {
    try {
        const data = await authService.login(email, password);

        if (data.status === 200){
            console.log(data.data.data);
            
        }
    } catch (err: any){
        console.log("error:", err.message);
        
        throw err;
    }
}