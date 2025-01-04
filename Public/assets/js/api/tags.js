import axios from "axios";
import page from "page";

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