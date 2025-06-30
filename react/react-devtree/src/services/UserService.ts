 
import { isAxiosError } from "axios";
import axiosInstance from "../config/axios";
import type { UserSinPasswordFormData } from "../models/AuthsModel";
 
class UserService {
 

  async getUserByToken( ) {
    try {
      
     
      const response = await axiosInstance.get<UserSinPasswordFormData>(`/user` );
     return response.data; // Devuelve la respuesta del servidor
    } catch (error) {
        if (isAxiosError(error) && error.response) {
          // Manejar errores de Axios }

          console.error("Error en loginUser:", error);
          throw new Error(error.response.data.error);
        }
    }
  }
}

export default new UserService();