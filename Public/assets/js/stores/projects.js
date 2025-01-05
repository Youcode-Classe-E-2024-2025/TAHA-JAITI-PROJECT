import { atom } from 'nanostores';
import page from 'page';
import axios from 'axios';
import { userRole } from '../utils/userUtil';

export const projectStore = atom([]);

export const getTasks = async () => {
    try {
        const user = userRole.get();
        console.log(user);
        
        const endpoint = user === 'guest' 
            ? 'http://localhost/api/project?p=public'
            : 'http://localhost/api/project?p=user';

        const response = await axios.get(endpoint, {withCredentials: true});

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