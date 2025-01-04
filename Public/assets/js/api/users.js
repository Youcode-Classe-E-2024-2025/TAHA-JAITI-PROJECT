import axios from "axios";
import page from "page";

export const getUsers = async () => {
    try {
        const reponse = await axios.get('http://localhost/api/users');

        const data = reponse.data.data;

        if (reponse.status === 200){
            return data;
        } else {
            sweetAlert('An error occured while fetching users');
        }

    } catch (err){
        page('/404');
        throw err;
    }
};

export const getProjectUsers = async (id) => {
    try {
        const reponse = await axios.get('http://localhost/api/users/projects/?id=' + id);

        const data = reponse.data.data;

        if (reponse.status === 200){
            return data;
        } else {
            sweetAlert('An error occured while fetching users');
        }

    } catch (err){
        page('/404');
        throw err;
    }
};