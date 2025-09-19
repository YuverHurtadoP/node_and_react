  
import { isAxiosError } from "axios";
import axiosInstance from "../config/axios";
import type { ProfileFormData, UserSinPasswordFormData } from "../models/AuthsModel";
 
 
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

  
async updatedUser(data: FormData) {
  try {
    const response = await axiosInstance.patch(`/user`, data, {
      headers: {
        // No pongas 'Content-Type', axios lo pone automáticamente para FormData
      },
    });
    return response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.error("Error en updatedUser:", error);
      throw new Error(error.response.data.error);
    }
  }
}
}



export default new UserService();