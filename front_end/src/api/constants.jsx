    export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const API_ENDPOINTS = {
    PRODUCTS: `/products`,
    CATEGORIES: `/categories`,
    SIDEDISH_PRODUCT: `/sidedish_product`,
    SIDEDISH: `/sidedishes`,
    AUTHLOGIN: `${API_URL}/auth/login`,
    AUTHPROFILE: `${API_URL}/auth/login`,
    FEATUREROLE: `/feature-roles`,
    EMPLOYEE: `/employees`,
    ACCOUNTS: `/accounts`,
    ROLES: `/roles`,
    ORDERS: `/orders`,
    TABLES: `/table`,
    ORDERSPRODUCTS: `/orders_products`,
};