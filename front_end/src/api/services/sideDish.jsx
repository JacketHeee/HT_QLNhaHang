import { API_ENDPOINTS } from "../constants";
import axios from 'axios';

const API_URL = API_ENDPOINTS.SIDEDISH;

export const getSideDish = async () => {
    const response = await axios.get(`${API_URL}`);
    return response.data;
}
