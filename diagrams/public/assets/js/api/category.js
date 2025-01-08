import axios from "axios";
import page from "page";
import { sweetAlert } from "../utils/sweetAlert";

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

export const addCatDB = async (id, cat_id) => {
    try {

        const response = await axios.post('http://localhost/api/categories/assign', {
            id,
            cat_id
        });

        if (response.status === 200){
            page(`${window.location.pathname}`);
            sweetAlert('Category assigned successfully');
        } else {
            sweetAlert('An error occured while adding Category');
        }

    } catch (err){
        page('/404');
        throw err;
    }
};