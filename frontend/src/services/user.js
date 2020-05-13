import axios from 'axios';

export const getUser = async (email,password)=>{
    return axios.post('/users/login',{
        email : email,
        password : password
    });
};



