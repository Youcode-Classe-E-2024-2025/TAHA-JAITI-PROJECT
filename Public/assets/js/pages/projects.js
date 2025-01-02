import page from "page";
import axios from "axios";
import { projectCard } from "../components/project_card.js";

export const projectsContainer = async () => {
    const element = document.createElement('div');
    element.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 w-full';

    const projects = await getTasks();

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

    return element;
};




const getTasks = async () => {
    try {
        const response = await axios.get('http://localhost/api/project');

        if (response.status === 200){
            return response.data.data
        } else {
            sweetAlert('Failed to get projects' + response.data.message);
            return null;
        }

    } catch (err){
        page('/404');
        throw err;
    }
};