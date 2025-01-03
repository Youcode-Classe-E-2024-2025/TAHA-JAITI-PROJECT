import { atom } from "nanostores";
import page from "page";
import axios from "axios";
import { sweetAlert } from "../utils/sweetAlert";

export const taskStore = atom([]);

export const getProjectTasks = async (id) => {
    try {
        const response = await axios.get(`http://localhost/api/task?id=${id}`);

        if (response.status === 200){
            const data = response.data.data;

            taskStore.set(data);
        } else {
            sweetAlert('Failed to get tasks' + response.data.message);
            return null;
        }

    } catch (err){
        page('/404');
        throw err;
    }

};