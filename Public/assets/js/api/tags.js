import axios from "axios";
import page from "page";
import { sweetAlert } from "../utils/sweetAlert";

export const getTags = async () => {
    try {
        const reponse = await axios.get('http://localhost/api/tags');

        const data = reponse.data.data;

        if (reponse.status === 200){
            return data;
        } else {
            sweetAlert('An error occured while tags users');
        }

    } catch (err){
        page('/404');
        throw err;
    }
};

export const addTagDB = async (tag, id) => {
    try {

        const response = await axios.post('http://localhost/api/tags/assign', {
            tag,
            id
        });

        if (response.status === 200){
            page(`${window.location.pathname}`);
            sweetAlert('Tag assigned successfully');
        } else {
            sweetAlert('An error occured while adding tag');
        }

    } catch (err){
        page('/404');
        throw err;
    }
}