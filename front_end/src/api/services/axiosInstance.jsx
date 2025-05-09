import axios from "axios";

// export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
export const API_URL = process.env.REACT_APP_API_URL;

//cài đặt gọi request kèm token
const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
      // Bỏ qua token cho các endpoint công khai
      const publicEndpoints = ['/products', '/tables'];
      const isPublic = publicEndpoints.some((endpoint) =>
        config.url.includes(endpoint)
      );
      if (!isPublic) {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => Promise.reject(error)
  );


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;