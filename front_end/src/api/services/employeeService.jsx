import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";

const API_URL = API_ENDPOINTS.EMPLOYEE;

export const getEmployees = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
}

export const addEmployee = async (employee) => { // object employee
    const response = await axiosInstance.post(`${API_URL}`, employee);
    return response.data;
}

export const updateEmployee = async (id, employee) => {
    const response = await axiosInstance.put(`${API_URL}/${id}`, employee);
    return response.data;
}

export const deleteEmployee = async (id) => {
    await axiosInstance.delete(`${API_URL}/${id}`);
}

export const getAllEmployeeNotHaveAccount = async () => {
    const response = await axiosInstance.get(`${API_URL}/get/notHaveAccount`);
    return response.data;
}