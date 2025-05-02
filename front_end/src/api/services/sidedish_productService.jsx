import { API_ENDPOINTS } from "../constants";
import axios from 'axios';

const API_URL = API_ENDPOINTS.SIDEDISH_PRODUCT;

// export const getSideDishByProduct = async (id) => {
//     const response = await axios.get(`${API_URL}/${id}/find/sideDish`);
//     return response.data;
// }

export const getProduct_SideDish = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
}