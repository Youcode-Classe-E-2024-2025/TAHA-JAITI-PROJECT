import axios from "axios";
import page from "page";
import {sweetAlert} from "../utils/sweetAlert"

export const fetchStats = async () => {
    try {
        const response = await axios.get('http://localhost/api/users/stats', {withCredentials: true});

        if (response.status === 200){
            return response.data.data;
        }

    } catch(err) {
        sweetAlert('failed to fetch stats');
        console.error(err);
        page('/404');
    }
};