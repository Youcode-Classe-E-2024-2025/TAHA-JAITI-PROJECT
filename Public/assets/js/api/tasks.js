import axios from "axios";
import { taskStore } from "../stores/tasks";
import { sweetAlert } from "../utils/sweetAlert";
import page from "page";

export const editTaskDB =  async (task) => {
    console.log(task);
    
    try {
        const response = await axios.put(`http://localhost/api/task`, {...task});
        if (response.status === 200){
            const currentTasks = taskStore.get();

            const updated = currentTasks.map((t) => {
                if (t.id === task.id) {
                    return { ...t, ...task };
                }
                return t;
            });

            taskStore.set(updated);
            sweetAlert("Task updated successfully");
            sweetAlert('Task updated successfully');
        }
    } catch (err){
        console.log(err);
        page('/404');
    }
}