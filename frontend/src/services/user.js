import axios from 'axios';

export const getUser = async (username,password)=>{
    return axios.post('/register',{
        username : username,
        password : password
    });
};

