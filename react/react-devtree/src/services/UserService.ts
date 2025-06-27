 
import { isAxiosError } from "axios";
import axiosInstance from "../config/axios";
 
class UserService {
 

  async getUserByToken( ) {
    try {
      
     
      const response = await axiosInstance.get(`/user` );
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