import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";
import { addFeatureRoles } from "./features_rolesService";

const API_URL = API_ENDPOINTS.ROLES;

export const getRoles = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
}

export const getRole = async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
}

export const isExisted = async(username) => {
    const list = await getRoles();
    const exist = list.some((item) => (item.username === username));
    return exist
}

export const addRole = async (role, listFeature) => { // object role và một mảng feature [1, 2, 3]

    const response = await axiosInstance.post(`${API_URL}`, role);

    const promise = listFeature.map((item) => {
        try {
            const featureroles = {roleId: response.data.id, featureId: item}
            return addFeatureRoles(featureroles)  
        } catch (error) {
            console.error(error)
        }

    })
    
    const responseWithList = await getRole(response.data.id);
    console.log(response.data.id);
    console.log(responseWithList);
    await Promise.all(promise);

    return responseWithList;
}

export const editRole = async (id, role) => {
    const response = await axiosInstance.patch(`${API_URL}/${id}`, role);
    return response.data;
}

export const deleteRole = async (id) => {
    await axiosInstance.delete(`${API_URL}/${id}`);
}