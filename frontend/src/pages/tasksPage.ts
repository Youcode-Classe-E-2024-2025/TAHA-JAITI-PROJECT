import taskCard from "@/components/taskCard";
import taskService from "@/services/taskService";
import getPermissions from "@/util/getPerms"
import { Context } from "page";

type TaskStatus = 'todo' | 'in_progress' | 'completed';

const tasksPage = async (ctx?: Context): Promise<HTMLElement> => {

    if (!ctx){
        const placeholder = document.createElement('div');
        placeholder.textContent = 'No valid context provided';
        return placeholder;
    }

    const projectId = ctx.params.id;    

    const permissions = getPermissions();

    const main = document.createElement('div');
    main.className = `flex flex-col gap-2 p-4`

    const addTaskMarkup = permissions.includes('create_task') ?
        `<button id='addTask' class="btn_second">
                        + TASK
                        </button>` : ``;
    const addTagMarkup = permissions.includes('create_tag') ?
        `<button id='addTag' class="btn_second">
                        + TAG
                        </button>` : ``;
    const addCatMarkup = permissions.includes('create_category') ?
        `<button id='addCat' class="btn_second">
                        + CATEGORY
                        </button>` : ``;
    main.innerHTML = `<div class="w-full flex justify-end items-center gap-4 px-4">
                        ${addCatMarkup}
                        ${addTagMarkup}
                        ${addTaskMarkup}
                     </div>`

    const element = document.createElement('div');
    element.className = 'grid grid-cols-1 md:grid-cols-3 gap-6 p-4';
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

    const todoCont = element.querySelector('#todoCont') as HTMLDivElement;
    const doingCont = element.querySelector('#doingCont') as HTMLDivElement;
    const doneCont = element.querySelector('#doneCont') as HTMLDivElement;

    const todoCount = element.querySelector('#todoCount') as HTMLDivElement;
    const doingCount = element.querySelector('#doingCount') as HTMLDivElement;
    const doneCount = element.querySelector('#doneCount') as HTMLDivElement;

    const containers = [
        { element: todoCont, status: 'todo' as TaskStatus, counter: todoCount },
        { element: doingCont, status: 'in_progress' as TaskStatus, counter: doingCount },
        { element: doneCont, status: 'completed' as TaskStatus, counter: doneCount },
    ];

    const renderTasks = async () => {
        try {
            

            const response = await taskService.getTasksByProjectId(projectId);
            const tasks = response.data.data;

            const counts: Record<TaskStatus, number> = { todo: 0, in_progress: 0, completed: 0 };

            containers.forEach(({ element }) => (element.innerHTML = ''));

            if (tasks && tasks.length > 0) {
                tasks.forEach(async (task) => {
                    const card = await taskCard(task);

                    const container = containers.find(c => c.status === task.status);
                    if (container) {
                        container.element.appendChild(card);
                        counts[task.status]++;
                    }
                });
            }

            containers.forEach(({ counter, status }) => {
                counter.textContent = `(${counts[status] || 0})`;
            });
        } catch (error) {
            console.error('Error rendering tasks:', error);
        }

    }

    await renderTasks();

    return element;
}

export default tasksPage;