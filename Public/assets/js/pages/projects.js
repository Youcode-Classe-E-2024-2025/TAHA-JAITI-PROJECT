import page from "page";
import { projectStore } from "../stores/projects.js";
import { projectCard } from "../components/project_card.js";
import { taskCard } from "../components/task_card.js";
import { taskStore } from "../stores/tasks.js";

export const projectsContainer = () => {
    const element = document.createElement('div');
    element.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 w-full';

    const renderProjects = () => {
        element.innerHTML = '';
        const projects = projectStore.get();

        if (projects && projects.length) {
            projects.forEach(project => {
                const card = projectCard(
                    project.project_name,
                    project.description,
                    project.task_count,
                    project.members_count
                );
                
                card.addEventListener('click', () => page(`/project/${project.project_id}`));
                element.appendChild(card);
            });
        } else {
            element.innerHTML = `
                <div class="col-span-full flex items-center justify-center h-40">
                    <p class="text-gray-400">No projects available</p>
                </div>
            `;
        }
    };

    const unsubscribe = projectStore.subscribe(renderProjects);
    renderProjects();

    element.addEventListener('DOMNodeRemoved', unsubscribe);

    return element;
};

export const porjectDetails = () => {
    const element = document.createElement('div');
    element.classList = 'grid grid-cols-1 md:grid-cols-3 gap-6 p-4';

    element.innerHTML = `<!--  todoColumn -->
                        <div class="bg-gray-800/50 backdrop-blur-xl rounded-sm border border-purple-500/10 p-4">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 bg-red-500 rounded-full"></div>
                                    <h2 class="text-white font-medium">To Do</h2>
                                    <span id="todoCount" class="text-gray-400 text-sm">(0)</span>
                                </div>
                                <button class="text-gray-400 hover:text-purple-400 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>

                            <!-- Tasks -->
                            <div id="todoCont" class="space-y-3 h-[40rem] overflow-y-auto">
                                

                                
                            </div>
                        </div>

                        <!-- DOING Column -->
                        <div class="bg-gray-800/50 backdrop-blur-xl rounded-sm border border-purple-500/10 p-4">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 bg-yellow-500 rounded-full"></div>
                                    <h2 class="text-white font-medium">In Progress</h2>
                                    <span id="doingCount" class="text-gray-400 text-sm">(0)</span>
                                </div>
                                <button class="text-gray-400 hover:text-purple-400 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>

                            <!-- Tasks -->
                            <div id="doingCont" class="space-y-3 h-[40rem] overflow-y-auto">
                                

                                
                            </div>
                        </div>

                        <!-- DONE Column -->
                        <div class="bg-gray-800/50 backdrop-blur-xl rounded-sm border border-purple-500/10 p-4">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-2">
                                    <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                                    <h2 class="text-white font-medium">Done</h2>
                                    <span id="doneCount" class="text-gray-400 text-sm">(0)</span>
                                </div>
                                <button class="text-gray-400 hover:text-purple-400 transition-colors">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>

                            <!-- Tasks -->
                            <div id="doneCont" class="space-y-3 h-[40rem] overflow-y-auto">
                                

                                
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

        const counts = { todo: 0, in_progress: 0, done: 0 };

        if (tasks && tasks.length) {
            tasks.forEach(t => {
                const card = taskCard(t.task_id, t.task_title, t.task_description,
                    t.task_deadline, t.task_created_at, t.assignee_names, t.tag_names, t.category_name)

                if (t.task_status === 'todo'){
                    todoCont.appendChild(card);
                    counts.todo++;
                } else if (t.task_status === 'in_progress'){
                    doingCont.appendChild(card);
                    counts.in_progress++;
                } else {
                    doneCont.appendChild(card);
                    counts.done++;
                }
            })
        }

        element.querySelector('#todoCount').textContent = `(${counts.todo})`;
        element.querySelector('#doingCount').textContent = `(${counts.in_progress})`;
        element.querySelector('#doneCount').textContent = `(${counts.done})`;
    };


    const unsubscribe = taskStore.subscribe(renderTasks);

    renderTasks();

    element.addEventListener('DOMNodeRemoved', unsubscribe);

    return element;
};