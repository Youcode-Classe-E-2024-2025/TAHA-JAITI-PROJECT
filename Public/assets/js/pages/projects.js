import page from "page";
import Sortable from "sortablejs";
import { projectStore } from "../stores/projects.js";
import { projectCard } from "../components/project_card.js";
import { taskCard } from "../components/task_card.js";
import { taskStore, updateTaskStatus } from "../stores/tasks.js";
import { handleCategory, handleTag, handleTask } from "../components/modals.js";
import { userId } from "../utils/userUtil.js";

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

                card.addEventListener('click', () => {
                    if (userId) {
                        page(`/projects/${project.project_id}`)
                    } else {
                        return page('/signup');
                    }
                });
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
    const main = document.createElement('div');
    main.classList = 'flex flex-col gap-4 p-4'
    main.innerHTML = `<div class="w-full flex justify-end items-center gap-4 px-4">
                        <button id='addCat' class="btn_second">
                        + CATEGORY
                        </button>
                        <button id='addTag' class="btn_second">
                        + TAG
                        </button>
                        <button id='addTask' class="btn_second">
                        + TASK
                        </button>
                    </div>`;

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
                        </div>`;
    main.appendChild(element);

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
                const card = taskCard(t.id, t.title, t.description,
                    t.deadline, t.created_at, t.assignee_names, t.tag_names, t.category_name)

                if (t.status === 'todo') {
                    todoCont.appendChild(card);
                    counts.todo++;
                } else if (t.status === 'in_progress') {
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

        const containers = [
            { element: todoCont, status: 'todo' },
            { element: doingCont, status: 'in_progress' },
            { element: doneCont, status: 'completed' },
        ];

        containers.forEach(({ element, status }) => {
            new Sortable(element, {
                group: 'tasks',
                animation: 150,
                onEnd(evt) {
                    const taskId = evt.item.dataset.id;

                    const targetContainer = containers.find(c => c.element === evt.to);
                    if (targetContainer) {
                        updateTaskStatus(taskId, targetContainer.status);
                    }
                },
            });
        });
    };

    const addCat = main.querySelector('#addCat');
    addCat.addEventListener('click', () => {
        handleCategory();
    });

    const addTag = main.querySelector('#addTag');
    addTag.addEventListener('click', () => {
        handleTag();
    });

    const addTask = main.querySelector('#addTask');
    addTask.addEventListener('click', () => {
        handleTask();
    });

    taskStore.subscribe(renderTasks);

    renderTasks();


    return main;
};