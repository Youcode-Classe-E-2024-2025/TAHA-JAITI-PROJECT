import { projectStore } from "../stores/projects.js";
import { projectCard } from "../components/project_card.js";

export const projectsContainer = () => {
    const element = document.createElement('div');
    element.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 w-full';

    const renderProjects = () => {
        element.innerHTML = '';

        const projects = projectStore.get(); 

        if (projects && projects.length) {
            projects.forEach(item => {
                const card = projectCard(item.project_name, item.description, item.task_count, item.members_count);
                element.appendChild(card);
            });
        } else {
            const noProjectsMessage = document.createElement('div');
            noProjectsMessage.textContent = 'No projects available';
            noProjectsMessage.className = 'text-white';
            element.appendChild(noProjectsMessage);
        }
    };

    const unsubscribe = projectStore.subscribe(renderProjects);

    renderProjects();

    element.addEventListener('DOMNodeRemoved', unsubscribe);

    return element;
};