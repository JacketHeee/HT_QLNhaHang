import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";

const API_URL = API_ENDPOINTS.ACCOUNTS;

export const getAccounts = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
}

export const addAccounts = async (account) => {
    const response = await axiosInstance.post(`${API_URL}`, account);
    return response.data;
}

export const updateAccount = async (id, account) => {
    const response = await axiosInstance.patch(`${API_URL}/${id}`, account);
    return response.data;
}

export const deleteAccount = async (id) => {
    await axiosInstance.delete(`${API_URL}/${id}`);
}

export const lockAccount = async (id) => {
    console.log(id)
    await axiosInstance.put(`${API_URL}/lock/${id}`)
}

export const unLockAccount = async (id) => {
    console.log(id)
    await axiosInstance.put(`${API_URL}/unlock/${id}`)
}