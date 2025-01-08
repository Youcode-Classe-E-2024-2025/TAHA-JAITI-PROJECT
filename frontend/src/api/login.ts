import axios from 'axios';

const login = async (email: string, password: string) => {
    try {
        const response = await axios.post('api/auth/login', { email, password});

        if (response.status === 200){
            console.log(response);
            
        }


    } catch (err){
        throw err;
    }

};

export default login;