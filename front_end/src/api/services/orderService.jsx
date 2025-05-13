import { API_ENDPOINTS } from "../constants";
import axiosInstance from "./axiosInstance";
import { createOrderProduct } from "./orderProductService";

const API_URL = API_ENDPOINTS.ORDERS;

export const getOrders = async () => {
    const response = await axiosInstance.get(`${API_URL}`);
    return response.data;
}

export const getOrder = async (id) => {
    const response = await axiosInstance.get(`${API_URL}/${id}`);
    return response.data;
}

export const createOrder = async (order, listCTHD) => {

    const response = await axiosInstance.post(`${API_URL}`, order);
    const newOrder = response.data;

    await Promise.all(
        listCTHD.map((item) => (
            createOrderProduct({
                orderId: newOrder.id,
                productId: item.product.ID,
                quantity: item.quantity,
                sideDishes: item.sideDishes
            })
        ))
    )

    return newOrder;
} 

export const accept = async (orderId) => {
    const obj = {status: 'Đã xác nhận'};
    const response = await axiosInstance.put(`${API_URL}/${orderId}`,obj);
    return response.data;
}