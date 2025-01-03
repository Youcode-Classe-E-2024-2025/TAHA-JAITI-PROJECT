import page from "page";
import { projectStore } from "../stores/projects.js";
import { projectCard } from "../components/project_card.js";
import { taskCard } from "../components/task_card.js";
import { getProjectTasks, taskStore } from "../stores/tasks.js";

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

                card.addEventListener('click', () => {
                    page(`/project/${item.project_id}`);
                });
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

export const porjectDetails = (id) => {
    const element = document.createElement('div');
    element.classList = 'grid grid-cols-1 md:grid-cols-3 gap-6 p-4';

    element.innerHTML = `<!--  todoColumn -->
                        <div class="bg-gray-800/50 backdrop-blur-xl rounded-sm border border-purple-500/10 p-4">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 bg-red-500 rounded-full"></div>
                                    <h2 class="text-white font-medium">To Do</h2>
                                    <span class="text-gray-400 text-sm">(0)</span>
                                </div>
                                <button class="text-gray-400 hover:text-purple-400 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>

                            <!-- Tasks -->
                            <div id="todoCont" class="space-y-3">
                                

                                
                            </div>
                        </div>

                        <!-- DOING Column -->
                        <div class="bg-gray-800/50 backdrop-blur-xl rounded-sm border border-purple-500/10 p-4">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 bg-yellow-500 rounded-full"></div>
                                    <h2 class="text-white font-medium">In Progress</h2>
                                    <span class="text-gray-400 text-sm">(0)</span>
                                </div>
                                <button class="text-gray-400 hover:text-purple-400 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>

                            <!-- Tasks -->
                            <div id="doingCont" class="space-y-3">
                                

                                
                            </div>
                        </div>

                        <!-- DONE Column -->
                        <div class="bg-gray-800/50 backdrop-blur-xl rounded-sm border border-purple-500/10 p-4">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                    <h2 class="text-white font-medium">Done</h2>
                                    <span class="text-gray-400 text-sm">(0)</span>
                                </div>
                                <button class="text-gray-400 hover:text-purple-400 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>

                            <!-- Tasks -->
                            <div id="doneCont" class="space-y-3">
                                

                                
                            </div>
                        </div>`

    const todoCont = element.querySelector('#todoCont');
    const doingCont = element.querySelector('#doingCont');
    const doneCont = element.querySelector('#doneCont');

    const renderTasks = () => {
        todoCont.innerHTML = '';
        doingCont.innerHTML = '';
        doneCont.innerHTML = '';

        const tasks = taskStore.get();

        if (tasks && tasks.length) {
            tasks.forEach(t => {
                const card = taskCard(t.task_id, t.task_title, t.task_description,
                    t.task_deadline, t.task_created_at, t.assignee_names, t.tag_names, t.category_name)

                todoCont.appendChild(card);
            })
        }
    };


    const unsubscribe = taskStore.subscribe(renderTasks);

    renderTasks();

    element.addEventListener('DOMNodeRemoved', unsubscribe);

    return element;
};