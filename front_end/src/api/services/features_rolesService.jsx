import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";

const API_URL = API_ENDPOINTS.FEATUREROLE;

export const getFeaturesByRoleName = async (name) => {
    const response = await axiosInstance.get(`${API_URL}/findfeature/${name}`);
    return response.data;
}