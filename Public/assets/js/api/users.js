import axios from "axios";
import page from "page";

export const getUsers = async () => {
    try {
        const reponse = await axios.get('http://localhost/api/users');

    } catch (err){
        page('/404');
        throw err;
    }
};