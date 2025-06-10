 
import type { UserFormData } from "../models/AuthsModel";
import axiosInstance from "../config/axios";
// Definir la URL base como constante
const BASE_URL = import.meta.env.VITE_API_URL;
 
class AuthService {
  async registerUser(data: UserFormData) {
    try {
      
      const response = await axiosInstance.post(` /auth/register`, data);
      return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
      console.error("Error en registerUser:", error);
      throw error;
    }
  }

  async loginUser(data: { email: string; password: string }) {
    try {
     
      const response = await axiosInstance.post(`${BASE_URL}/auth/login`, data);
      return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
      
      console.error("Error en loginUser:", error);
      throw error;
    }
  }
}

export default new AuthService();