export const header = () => {
    return `<header class="bg-gradient-to-r from-gray-800 to-black">
        <nav class="max-w-7xl mx-auto px-4">
            <div class="flex items-center justify-between h-16">
                <!-- Logo Area -->
                <div class="flex items-center space-x-3 select-none">
                    <span class="text-xl font-bold text-white bg-purple-600 px-3 py-1 rounded-sm">T</span>
                    <span class="text-lg text-white font-bold">TASKFLOW</span>
                </div>

                <!-- Main Navigation -->
                <div class="hidden md:flex items-center text-lg space-x-6">
                    <a href="#" class=" hover:text-white">Home</a>
                    <a href="#" class=" hover:text-white">Dashboard</a>
                    <a href="#" class=" hover:text-white">Projects</a>
                </div>

                <!-- Auth Buttons -->
                <div class="flex items-center space-x-3">
                    <a href="/login" data-ajax class="btn_primary bg-transparent">
                        Login
                    </a>
                    <button class="btn_primary">
                        Sign up
                    </button>
                    <button class="btn_primary">
                        Log out
                    </button>
                </div>
            </div>
        </nav>

        <!-- Minimal accent line -->
        <div class="h-[1px] bg-purple-600/30"></div>
    </header>`

};