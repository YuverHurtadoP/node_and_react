import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrarUsuario from "./components/RegistrarUsuario/RegistrarUsuario";
import LoginComponent from "./components/Login/Login";
import LayoutsAuthComponent from "./components/layouts/auth/AuthLayouts";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutsAuthComponent />}>
          <Route path="/auth/login" element={<LoginComponent />} />
          <Route path="/auth/register" element={<RegistrarUsuario />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
