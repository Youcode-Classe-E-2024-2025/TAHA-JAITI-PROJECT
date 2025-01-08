import { Chart, PieController, ArcElement, Legend, Title, Tooltip } from 'chart.js';
import { fetchStats } from "../api/stats";

Chart.register(PieController, ArcElement, Legend, Title, Tooltip);

export const statPage = () => {
    const container = document.createElement('div');
    container.className = 'flex justify-center items-center w-full h-full'; 

    const element = document.createElement('canvas');
    element.id = 'taskStats';
    element.style.maxWidth = '100%';
    element.style.height = 'auto';
    renderStats(element);

    container.appendChild(element);
    return container;
};

const renderStats = async (element) => {
    const stats = await fetchStats();
    const ctx = element.getContext('2d');
    
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Completed', 'In Progress', 'Todo'],
            datasets: [{
                data: [stats.completed, stats.in_progress, stats.pending],
                backgroundColor: [
                    '#4CAF50',
                    '#2196F3',
                    '#FFC107'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                title: {
                    display: true,
                    text: 'Task Statistics',
                    font: {
                        size: 16
                    }
                }
            }
        }
    });
};
