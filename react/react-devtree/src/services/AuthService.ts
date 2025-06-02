import axios from "axios";
import type { UserFormData } from "../models/AuthsModel";

// Definir la URL base como constante
const BASE_URL = "http://localhost:4000";

class AuthService {
  async registerUser(data: UserFormData) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, data);
      return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
      console.error("Error en registerUser:", error);
      throw error;
    }
  }

  async loginUser(data: { email: string; password: string }) {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, data);
      return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
      console.error("Error en loginUser:", error);
      throw error;
    }
  }
}

export default new AuthService();