import { Context } from 'page';
import taskService from '@/services/taskService';
import { Chart, DoughnutController, ArcElement, Legend, Title, Tooltip } from 'chart.js';
import * as XLSX from 'xlsx'; // Import SheetJS
import { Task } from '@/types/task';

Chart.register(DoughnutController, ArcElement, Legend, Title, Tooltip);


interface StatsData {
    completed: number;
    in_progress: number;
    todo: number;
}

export const statPage = async (ctx?: Context): Promise<HTMLElement> => {
    const container = document.createElement('div');
    container.className = 'flex flex-col justify-center items-center w-full h-full p-4';

    if (!ctx) {
        const placeholder = document.createElement('div');
        placeholder.textContent = 'No valid context provided';
        container.appendChild(placeholder);
        return container;
    }

    const projectId = parseInt(ctx.params.id, 10);

    try {
        const res = await taskService.getTasksByProjectId(projectId);
        const tasks = res.data.data ?? [];

        if (tasks.length === 0) {
            const noTasksMessage = document.createElement('div');
            noTasksMessage.className = 'text-center text-gray-600 text-lg';
            noTasksMessage.textContent = 'No tasks found for this project.';
            container.appendChild(noTasksMessage);
            return container;
        }

        const element = document.createElement('canvas');
        element.id = 'taskStats';
        element.style.maxWidth = '800px'; 
        element.style.height = '400px'; 

        const exportButton = document.createElement('button');
        exportButton.textContent = 'Export to Excel';
        exportButton.className = 'btn_second';
        exportButton.addEventListener('click', () => exportToExcel(tasks));

        container.appendChild(element);
        container.appendChild(exportButton);
        await renderStats(tasks, element);

    } catch (error) {
        console.error('Failed to fetch tasks:', error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'text-center text-red-600 text-lg';
        errorMessage.textContent = 'Failed to load task statistics.';
        container.appendChild(errorMessage);
    }

    return container;
};

const renderStats = async (tasks: Task[], element: HTMLCanvasElement): Promise<void> => {
    const stats: StatsData = {
        completed: 0,
        in_progress: 0,
        todo: 0,
    };

    tasks.forEach(task => {
        if (task.status === 'completed') {
            stats.completed++;
        } else if (task.status === 'in_progress') {
            stats.in_progress++;
        } else if (task.status === 'todo') {
            stats.todo++;
        }
    });

    const ctx = element.getContext('2d');

    if (!ctx) {
        console.error('Could not get canvas context');
        return;
    }

    new Chart(ctx, {
        type: 'doughnut', 
        data: {
            labels: ['Completed', 'In Progress', 'Todo'],
            datasets: [{
                data: [stats.completed, stats.in_progress, stats.todo],
                backgroundColor: [
                    '#4CAF50', 
                    '#2196F3',
                    '#FFC107'  
                ],
                borderWidth: 1,
                hoverOffset: 10,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: {
                            size: 14,
                            family: 'Arial, sans-serif',
                        },
                        color: '#333',
                    },
                },
                title: {
                    display: true,
                    text: 'Task Statistics',
                    font: {
                        size: 18,
                        family: 'Arial, sans-serif',
                    },
                    color: '#333',
                    padding: 20,
                },
                subtitle: {
                    display: true,
                    text: 'Distribution of tasks by status',
                    font: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                    color: '#666',
                    padding: 10,
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleFont: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                    bodyFont: {
                        size: 14,
                        family: 'Arial, sans-serif',
                    },
                },
            },
            animation: {
                duration: 1000,
                easing: 'easeInOutQuart',
            },
        },
    });
};

const exportToExcel = (tasks: Task[]): void => {
    const stats: StatsData = {
        completed: 0,
        in_progress: 0,
        todo: 0,
    };

    tasks.forEach(task => {
        if (task.status === 'completed') {
            stats.completed++;
        } else if (task.status === 'in_progress') {
            stats.in_progress++;
        } else if (task.status === 'todo') {
            stats.todo++;
        }
    });

    const data = tasks.map(task => ({
        Status: task.status,
        Count: stats[task.status]
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Task Statistics');

    XLSX.writeFile(workbook, 'task_statistics.xlsx');
};