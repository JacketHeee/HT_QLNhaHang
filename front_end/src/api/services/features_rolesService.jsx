import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";

const API_URL = API_ENDPOINTS.FEATUREROLE;

export const getFeaturesByRoleName = async (name) => {
    const response = await axiosInstance.get(`${API_URL}/findfeature/${name}`);
    return response.data;
}

export const addFeatureRoles = async (featurerole) => { // object employee
    const response = await axiosInstance.post(`${API_URL}`, featurerole);
    return response.data;
}

export const editFeatureForRole = async(id, listc) => {
    const obj = {featureIds: listc}
    const response = await axiosInstance.patch(`${API_URL}/role/${id}/features`, obj);
    return response.data;
}