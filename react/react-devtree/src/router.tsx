import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrarUsuario from "./components/RegistrarUsuario/RegistrarUsuario";
import LoginComponent from "./components/Login/Login";
 
export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/login" element={<LoginComponent />} />
                <Route path="/auth/registrar" element={<RegistrarUsuario />} />
            </Routes>
        </BrowserRouter>
    );
}
