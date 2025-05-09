import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";

const API_URL = API_ENDPOINTS.TABLES;

export const getTables = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
}

export const getTable = async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
}