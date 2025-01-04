import axios from "axios";
import page from "page";

export const getCategories = async () => {
    try {
        const reponse = await axios.get('http://localhost/api/categories');

        const data = reponse.data.data;

        if (reponse.status === 200){
            return data;
        } else {
            sweetAlert('An error occured while fetching categories');
        }

    } catch (err){
        page('/404');
        throw err;
    }
};