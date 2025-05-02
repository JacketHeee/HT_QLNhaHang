import { API_ENDPOINTS } from "../constants";
import axios from 'axios';

const API_URL = API_ENDPOINTS.PRODUCTS;

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
}

export const getProduct = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
}

export const lockProduct = async (id) => {
    await axios.put(`${API_URL}/${id}/lock`)
}

export const unLockProduct = async (id) => {
    await axios.put(`${API_URL}/${id}/unlock`)
}
