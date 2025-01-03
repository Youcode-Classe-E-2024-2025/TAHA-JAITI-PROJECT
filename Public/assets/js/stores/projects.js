import { atom } from 'nanostores';
import page from 'page';
import axios from 'axios';

export const projectStore = atom([]);

export const getTasks = async () => {
    try {
        const response = await axios.get('http://localhost/api/project');

        if (response.status === 200){
            const data =  response.data.data;

            projectStore.set(data);
        } else {
            sweetAlert('Failed to get projects' + response.data.message);
            return null;
        }

    } catch (err){
        page('/404');
        throw err;
    }
};