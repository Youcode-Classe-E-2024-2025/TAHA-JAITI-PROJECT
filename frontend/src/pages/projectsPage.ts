import projectService from "@/services/projectService";



export const projectsContainer = async () => {
    const response = await projectService.getProjects();
    const projects = response.data.data;

    const element = document.createElement('div');
    element.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 w-full';

    const renderProjects = () => {
        console.log(projects);
        
        element.innerHTML = "";

        

    }
    

    renderProjects();
    return element;
}