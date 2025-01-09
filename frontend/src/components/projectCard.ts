import Project from "@/types/projects"

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const projectCard = (project: Project) => {
    const element = document.createElement('div');
    element.className = 'project_card';
    element.innerHTML = `<div class="p-5">
                            <!-- Title & Description -->
                            <div class="mb-4">
                                <h3 class="text-white text-lg font-medium mb-2 group-hover:text-purple-400 transition-colors">${project.name}</h3>
                                <p class="text-gray-400 text-sm line-clamp-2">${project.description}</p>
                            </div>

                            <!-- Stats Grid -->
                            <div class="grid grid-cols-2 gap-4 py-4 border-t border-purple-500/10">
                                <div class="text-center">
                                    <div class="text-purple-400 text-lg font-medium">${project.visibility.toUpperCase()}</div>
                                    <div class="text-gray-400 text-xs">Visibility</div>
                                </div>
                                <div class="text-center border-l border-r border-purple-500/10">
                                    <div class="text-purple-400 text-lg font-medium">${formatDate(project.deadline)}</div>
                                    <div class="text-gray-400 text-xs">Deadline</div>
                                </div>
                            </div>
                        </div>`;

    return element;
    
}

export default projectCard;