import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import "./RegistrarUsuario.css";

const RegistrarUsuario = () => {
  interface FormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log("Datos del formulario:", data);
  };

  const password = watch("password");

  return (
    <div className="min-vh-100 d-flex flex-column align-items-center">
      <div
        className="p-4 rounded-3 shadow mt-5"
        style={{ width: "400px", backgroundColor: "#fefffe", color: "black" }}
      >
        <h2 className="text-center mb-4">Crear Cuenta</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Nombre
            </label>
            <input
              type="text"
              className="form-control"
              style={{ backgroundColor: "#eef3f7" }}
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {typeof errors.name?.message === "string" && (
              <small className="text-danger">{errors.name.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo Electrónico
            </label>
            <input
              style={{ backgroundColor: "#eef3f7" }}
              type="email"
              className="form-control"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Correo inválido",
                },
              })}
            />
            {typeof errors.email?.message === "string" && (
              <small className="text-danger">{errors.email.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Contraseña
            </label>
            <input
              style={{ backgroundColor: "#eef3f7" }}
              type="password"
              className="form-control"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />
            {typeof errors.password?.message === "string" && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirmar Contraseña
            </label>
            <input
              style={{ backgroundColor: "#eef3f7" }}
              type="password"
              className="form-control"
              {...register("confirmPassword", {
                required: "Debes confirmar tu contraseña",
                validate: (value) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
            {typeof errors.confirmPassword?.message === "string" && (
              <small className="text-danger">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Crear Cuenta
          </button>
        </form>

        {/* Enlace para iniciar sesión */}
        <div className="text-center mt-3">
          <span>¿Ya tienes cuenta?</span>
          <Link
            to="/auth/login"
            className="text-decoration-none ms-2"
            style={{ color: "#4f90ff" }}
          >
            Iniciar Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegistrarUsuario;
