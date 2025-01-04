import axios from "axios";
import { taskStore } from "../stores/tasks";
import { sweetAlert } from "../utils/sweetAlert";
import page from "page";

export const editTaskDB =  async (task) => {
    console.log(task);
    
    try {
        const response = await axios.put(`http://localhost/api/task`, {...task});
        if (response.status === 200){
            page(`${window.location.pathname}`);
            sweetAlert('Task updated successfully');
        }
    } catch (err){
        console.log(err);
        page('/404');
    }
}

export const deleteTaskDB = async (task) => {
    try {
        const reponse = await axios.delete(`http://localhost/api/task?id=${task.id}`);


        if (reponse.status === 200){
            const currentTasks = taskStore.get();
            const updatedTasks = currentTasks.filter(t => t.id !== task.id);
            taskStore.set(updatedTasks);
            
            sweetAlert('Task deleted successfully');
        }
    } catch (err){
        page('/404');
    }

};