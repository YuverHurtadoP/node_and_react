import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegistrarUsuario from "./components/RegistrarUsuario/RegistrarUsuario";
import LoginComponent from "./components/Login/Login";
import LayoutsAuthComponent from "./components/layouts/auth/AuthLayouts";
// Update the import path and extension to match the actual file, e.g. AppLayouts.tsx or AppLayouts.js
import LayoutsAppComponent from "./components/layouts/app/AppLayouts";
import LinkTreeComponent from "./components/LinkTree/LinkTree";
import ProfileComponent from "./components/Profile/Profile";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LayoutsAuthComponent />}>
          <Route path="/auth/login" element={<LoginComponent />} />
          <Route path="/auth/register" element={<RegistrarUsuario />} />
        </Route>
        <Route path="/admin" element={<LayoutsAppComponent />}>
          <Route index ={true}  element={<LinkTreeComponent />} />
           <Route path="profile"  element={<ProfileComponent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
