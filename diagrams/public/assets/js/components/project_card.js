export const projectCard = (title, desc, taskCount, memberCount) => {
    const element = document.createElement('div');
    element.className = 'project_card';
    element.innerHTML = `<div class="p-5">
                            <!-- Title & Description -->
                            <div class="mb-4">
                                <h3 class="text-white text-lg font-medium mb-2 group-hover:text-purple-400 transition-colors">${title}</h3>
                                <p class="text-gray-400 text-sm line-clamp-2">${desc}</p>
                            </div>

                            <!-- Stats Grid -->
                            <div class="grid grid-cols-2 gap-4 py-4 border-t border-purple-500/10">
                                <div class="text-center">
                                    <div class="text-purple-400 text-lg font-medium">${taskCount}</div>
                                    <div class="text-gray-400 text-xs">Tasks</div>
                                </div>
                                <div class="text-center border-l border-r border-purple-500/10">
                                    <div class="text-purple-400 text-lg font-medium">${memberCount}</div>
                                    <div class="text-gray-400 text-xs">Members</div>
                                </div>
                            </div>
                        </div>`;

    return element;
};