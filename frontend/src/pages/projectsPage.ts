import projectCard from "@/components/projectCard";
import projectService from "@/services/projectService";
import getUserId from "@/util/getUserId";
import page from "page";



export const projectsContainer = async () => {
    const logged = getUserId();

    const response = logged ? await projectService.getMyProjects() : await projectService.getProjects();
    const projects = response.data.data;

    const element = document.createElement('div');
    element.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 w-full';

    const renderProjects = () => {
        
        element.innerHTML = "";

        if (projects.length > 0){
            projects.forEach(project => {
                const card =projectCard(project);

                card.addEventListener('click', () => {
                    page(`/projects/${project.id}`)
                })

                element.appendChild(card);
            });
        } else {
            element.innerHTML = `
                <div class="col-span-full flex items-center justify-center h-40">
                    <p class="text-gray-400">No projects available</p>
                </div>
            `;
        }

    }
    

    renderProjects();
    return element;
}