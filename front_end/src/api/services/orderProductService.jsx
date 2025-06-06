import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";

const API_URL = API_ENDPOINTS.ORDERSPRODUCTS;

export const getorderproducts = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
}

export const createOrderProduct = async (orderproduct) => {
    const response = await axiosInstance.post(`${API_URL}`, orderproduct);
    return response.data;
}