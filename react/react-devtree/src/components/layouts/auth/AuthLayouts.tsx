import './AuthLayouts.css';
 import { Outlet } from 'react-router-dom';
const LayoutsAuthComponent = () => {
  return (
    <div className="bg-custom text-white min-vh-100 w-100 d-flex flex-column align-items-center">
      <img
        src="/logo.svg"
        alt="Redes Sociales"
        className="img-fluid my-4"
        style={{ maxWidth: '400px' }}
      />
  <Outlet />
 
    </div>
  );
};

export default LayoutsAuthComponent;
