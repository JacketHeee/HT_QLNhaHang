//cho đăng nhập
import { API_ENDPOINTS } from "../constants";
import axios from 'axios';

const API_URLLOGIN = API_ENDPOINTS.AUTHLOGIN;
const API_URLPROFILE = API_ENDPOINTS.AUTHPROFILE;

export const login = async (usrname, passwd) => {

    const body = {
        username: usrname,
        password: passwd
    }

    const response = await axios.post(`${API_URLLOGIN}`, body);
    return response.data;
}

export const profile = async (token) => {
    const header = {
            Authorization: `Bearer ${token}`,
    }
    
    const response = await axios.get(`${API_URLPROFILE}`,{
        headers: header
    });
    return response.data;
}