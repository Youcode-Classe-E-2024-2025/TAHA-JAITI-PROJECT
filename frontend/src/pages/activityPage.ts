import { Context } from "page";
import { logCard } from "@/components/acitivtyCard";
import { fetchActivityLog } from "@/services/activityService";

const logPage = async (ctx?: Context): Promise<HTMLElement> => {
    if (!ctx) {
        const placeholder = document.createElement('div');
        placeholder.textContent = 'No valid context provided';
        return placeholder;
    }

    const projectId = ctx.params.id;

    const element = document.createElement('div');
    element.className = `max-w-2xl mx-auto bg-gray-900 rounded-lg shadow-xl p-6 overflow-auto mt-16`;

    const title = document.createElement('h2');
    title.className = 'text-2xl font-bold text-white mb-6';
    title.textContent = 'Activity Timeline';
    element.appendChild(title);

    const logContainer = document.createElement('div');
    logContainer.className = 'space-y-6';
    element.appendChild(logContainer);

    try {
        const activityLog = await fetchActivityLog(projectId);

        if (activityLog.length === 0) {
            const noActivities = document.createElement('div');
            noActivities.className = 'text-gray-400 text-center';
            noActivities.textContent = 'No activities found for this project.';
            logContainer.appendChild(noActivities);
        } else {
            activityLog.forEach((log) => {
                const logItem = logCard(log);
                logContainer.appendChild(logItem);
            });
        }
    } catch (error) {
        console.error('Failed to fetch activity log:', error);

        const errorMessage = document.createElement('div');
        errorMessage.className = 'text-red-400 text-center';
        errorMessage.textContent = 'Failed to load activity log. Please try again later.';
        logContainer.appendChild(errorMessage);
    }

    return element;
};

export default logPage;