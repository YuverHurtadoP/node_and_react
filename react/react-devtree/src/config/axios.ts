import axios from "axios";  

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  // No pongas headers aquí, deja que Axios los maneje según el tipo de body
}); 

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;