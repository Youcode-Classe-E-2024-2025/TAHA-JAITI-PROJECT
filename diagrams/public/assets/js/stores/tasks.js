import { atom } from "nanostores";
import page from "page";
import axios from "axios";
import { sweetAlert } from "../utils/sweetAlert";

export const taskStore = atom([]);

export const getProjectTasks = async (id) => {
    try {
        const response = await axios.get(`http://localhost/api/task?id=${id}`);

        if (response.status === 200) {
            const data = response.data.data;

            taskStore.set(data);
        } else {
            sweetAlert('Failed to get tasks' + response.data.message);
            return null;
        }

    } catch (err) {
        page('/404');
        throw err;
    }

};

export const updateTaskStatus = async (taskId, status) => {
    const tasks = taskStore.get();
    const index = tasks.findIndex(task => task.id === parseInt(taskId));

    if (index === -1) {
        sweetAlert('Task not found');
        return;
    }

    try {
        const response = await axios.put(`http://localhost/api/task/status?id=${taskId}`, {
            status,
        });

        if (response.status !== 200) {
            sweetAlert('Failed to update task status: ' + response.data.message);
        }
    } catch (err) {
        sweetAlert('Error updating task status: ' + (err.message || 'Unknown error'));
    }

    tasks[index].status = status;
    taskStore.set([...tasks]);
};