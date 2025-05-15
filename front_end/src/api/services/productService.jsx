import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";

const API_URL = API_ENDPOINTS.PRODUCTS;

export const getProducts = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
}

export const findAllProductNotLock = async () => {
    const response = await axiosInstance.get(`${API_URL}/product/notlock`);
    return response.data;
}

export const getProduct = async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
}

export const lockProduct = async (id) => {
    await axiosInstance.put(`${API_URL}/${id}/lock`)
}

export const unLockProduct = async (id) => {
    await axiosInstance.put(`${API_URL}/${id}/unlock`)
}
