import { useState } from "react";
import { Link } from "react-router-dom";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password)
  };

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center" >
      
      <div className="p-4 rounded-3 shadow mt-5" style={{ width: "350px", backgroundColor: "#eef3f7", color: "black" }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Correo Electrónico</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Iniciar Sesión
          </button>
        </form>

       
        <div className="text-center mt-3">
          <span>¿No tienes cuenta?</span>
          <Link to="/auth/register" className="text-decoration-none ms-2" style={{ color: "#4f90ff" }}>
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
