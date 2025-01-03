export const taskCard = (id, title, desc, deadline, created_at, assignee, tag, category) => {
    const element = document.createElement('div');
    element.className = 'bg-gray-900/50 border border-purple-500/10 hover:border-purple-500/30 rounded-sm p-4 transition-all cursor-pointer';
    element.innerHTML = `<!-- Task Card -->
                            <div
                                class="group bg-gray-900/50 border border-purple-500/10 hover:border-purple-500/30 rounded-sm p-4 transition-all cursor-pointer">
                                <!-- Task Header -->
                                <div class="flex justify-between items-start mb-2">
                                    <span class="text-sm font-medium text-purple-400">${title}</span>
                                    <div class="flex gap-2">
                                        <button
                                            class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-sm hover:bg-blue-500/20">Edit</button>
                                        <button
                                            class="text-xs px-2 py-1 bg-red-500/10 text-red-400 rounded-sm hover:bg-red-500/20">Delete</button>
                                    </div>
                                </div>

                                <!-- Category & Tags -->
                                <div class="flex flex-wrap gap-2 mb-3">
                                    <span class="text-xs px-2 py-1 bg-blue-500/10 text-blue-400 rounded-sm">${category}</span>
                                    <span class="text-xs px-2 py-1 bg-gray-500/10 text-gray-400 rounded-sm">#api</span>
                                    <span class="text-xs px-2 py-1 bg-gray-500/10 text-gray-400 rounded-sm">#integration</span>
                                </div>

                                <!-- Description -->
                                <p class="text-gray-400 text-sm mb-3">${desc}</p>

                                <!-- Task Meta -->
                                <div class="grid grid-cols-2 gap-2 mb-3 text-xs text-gray-400">
                                    <div class="flex items-center gap-1">
                                        <i class="far fa-calendar"></i>
                                        <span>Created: ${created_at}</span>
                                    </div>
                                </div>

                                <!-- Assignee -->
                                <div class="flex items-center justify-between border-t border-purple-500/10 pt-3">
                                    <div class="flex items-center gap-2">
                                        <div class="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500/30"></div>
                                        <span class="text-xs text-gray-400">Sarah Parker</span>
                                    </div>
                                    <span class="text-xs text-gray-500">Due in 2d</span>
                                </div>
                            </div>`;

    return element;

};










