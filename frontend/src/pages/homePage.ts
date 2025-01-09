export const homePage = () => {
    const element = document.createElement('main');
    element.id = 'homePage';
    element.className = 'container mx-auto px-4 py-16 h-full w-full flex flex-col justify-center items-center';
    element.innerHTML = `<section class="text-center mb-16">
            <h2 class="text-5xl font-bold text-white mb-6">Streamline Your Workflow</h2>
            <p class="text-purple-200 text-xl mb-8 max-w-2xl mx-auto">Manage tasks, collaborate with your team, and boost productivity with TaskFlow's intuitive interface.</p>
            <div class="w-full flex justify-center gap-2">
                <a href="/login" data-ajax class="btn_primary bg-transparent">Already a user?</a>
                <a href="/signup" data-ajax class="btn_primary">Get started</a>
            </div>
            
        </section>

        <section class="grid md:grid-cols-3 gap-8 mb-16">
            <div class="bg-gray-700 p-6 rounded-sm">
                <h3 class="text-white text-xl font-bold mb-4">Task Management</h3>
                <p class="text-purple-200">Create, organize, and track tasks with ease using our powerful management tools.</p>
            </div>
            <div class="bg-gray-700 p-6 rounded-sm">
                <h3 class="text-white text-xl font-bold mb-4">Team Collaboration</h3>
                <p class="text-purple-200">Work together seamlessly with real-time updates and shared workspaces.</p>
            </div>
            <div class="bg-gray-700 p-6 rounded-sm">
                <h3 class="text-white text-xl font-bold mb-4">Progress Tracking</h3>
                <p class="text-purple-200">Monitor project progress with visual analytics and detailed reports.</p>
            </div>
        </section>`;

    return element;
};
