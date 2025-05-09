import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";

const API_URL = API_ENDPOINTS.ORDERSPRODUCTS;

export const getorderproducts = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
}