import { useQuery } from '@tanstack/react-query';
import './AppLayouts.css';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import UserService from "../../../services/UserService";
import { useEffect } from "react";
const LayoutsAppComponent = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('Sesión cerrada');
     navigate("/auth/Login");
    localStorage.removeItem('token');  
  };
  const { data,isLoading, error, isError} = useQuery({
    queryFn:() => UserService.getUserByToken(),
    queryKey: ["user"],
    retry:1,
  });
  console.log(data);
  console.log(isLoading);
  console.log(error?.message);
  console.log(isError); 

  /*useEffect(() => {
    console.log("Componente montado (equivalente a ngOnInit)");

    
  }, [])*/

  return (
    <div className="bg-custom text-white min-vh-100 w-100 d-flex flex-column">

      {/* Header */}
      <header className="w-100 py-3 px-4 d-flex align-items-center justify-content-between border-bottom" style={{ backgroundColor: '#0a0d17' }}>
        <div className="d-flex align-items-center">
          <img  src="/logo.svg" alt="DevTree Logo" style={{ height: '40px' }} />
          
        </div>

        <nav className="d-flex align-items-center gap-4">
          <Link to="profile" className="nav-link text-white">Perfil</Link>
          <Link to="" className="nav-link text-white">Links</Link>
          <button onClick={handleLogout} className="btn btn-outline-light btn-sm">
            Cerrar sesión
          </button>
        </nav>
      </header>

      {/* Contenido dinámico con fondo personalizado */}
      <main  className="flex-grow-1 d-flex flex-column align-items-center justify-content-center p-4" style={{ backgroundColor: '#eef3f7', color: 'black' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutsAppComponent;
