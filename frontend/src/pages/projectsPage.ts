import projectService from "@/services/projectService";

export const projectsContainer = async () => {
    const projects = await projectService.getProjects();
    
    const element = document.createElement('div');
    element.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 w-full';

    console.log(projects);
    
    return element;
}