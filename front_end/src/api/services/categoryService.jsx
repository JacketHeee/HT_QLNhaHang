import { API_ENDPOINTS } from "../constants";
import axios from 'axios';

const API_URL = API_ENDPOINTS.CATEGORIES;

export const getProductsByCategoryID = async (id) => {
    const response = await axios.get(`${API_URL}/${id}/products`);
    return response.data;
}