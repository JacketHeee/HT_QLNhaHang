export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
export const API_ENDPOINTS = {
    PRODUCTS: `${API_URL}/products`,
    CATEGORIES: `${API_URL}/categories`,
    SIDEDISH_PRODUCT: `${API_URL}/sidedish_product`,
    SIDEDISH: `${API_URL}/sidedishes`
};