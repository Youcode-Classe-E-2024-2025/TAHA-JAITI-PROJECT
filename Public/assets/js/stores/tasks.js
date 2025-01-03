import { atom } from "nanostores";
import page from "page";
import axios from "axios";

export const taskStore = atom([]);

export const getProjectTasks = async (id) => {
    try {
        const response = await axios.get(`http://localhost/api/task?id=${id}`);

        if (response.status === 200){
            const data = response.data.data;

            console.log(data);
            
        }

    } catch (err){
        page('/404');
        throw err;
    }

};