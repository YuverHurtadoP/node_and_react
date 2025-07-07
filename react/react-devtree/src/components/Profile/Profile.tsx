import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useUser } from "../../Context/UserContext";
import type { ProfileFormData } from "../../models/AuthsModel";
import { toast, ToastContainer } from "react-toastify";
// .

import userService from "../../services/UserService";
const ProfileComponent = () => {
  const user = useUser();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<ProfileFormData>({
    defaultValues: {
      handle: "",
      description: "",
      imagen: null,
    },
  });

  // Establecer valores iniciales cuando el usuario esté disponible
  useEffect(() => {
    if (user) {
      setValue("handle", user.handle || "");
      setValue("description", user.description || "");

      // Si el usuario ya tiene imagen, mostrarla como preview
      if (user.imagenUrl) {
        setPreview(user.imagenUrl);
      }
    }
  }, [user, setValue]);

  // Previsualización de imagen
  const imageFile = watch("imagen");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const objectUrl = URL.createObjectURL(imageFile[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageFile]);

  const onSubmit = (data: ProfileFormData) => {
    const formData = new FormData();
    formData.append("handle", data.handle);
    formData.append("description", data.description);
    if (data.imagen && data.imagen[0]) {
      formData.append("imagen", data.imagen[0]);
    }
    // Aquí puedes hacer la petición a la API
    console.log("Formulario enviado:", data);
    userService
      .updatedUser(data)
      .then((response) => {
        // Manejar la respuesta de la API
             toast.success("Perfil actualizado correctamente");

      })
      .catch((error) => {
        toast.error("Error al actualizar el perfil");
        console.error("Error:", error);
      });
  };

  return (
    <div className="container mt-5">
       <ToastContainer />
      <div className="row justify-content-center">
        {/* Formulario */}
        <div
          className="col-md-6"
          style={{
            backgroundColor: "#f9f9f9",
            padding: "2rem",
            borderRadius: "8px",
          }}
        >
          <h5 className="text-center mb-4">Editar Información</h5>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Handle */}
            <div className="mb-3">
              <label htmlFor="handle" className="form-label">
                Handle:
              </label>
              <input
                id="handle"
                type="text"
                className={`form-control ${errors.handle ? "is-invalid" : ""}`}
                placeholder="handle o Nombre de Usuario"
                {...register("handle", {
                  required: "Este campo es obligatorio",
                })}
              />
              {errors.handle && (
                <div className="invalid-feedback">{errors.handle.message}</div>
              )}
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Descripción:
              </label>
              <textarea
                id="description"
                className={`form-control ${
                  errors.description ? "is-invalid" : ""
                }`}
                placeholder="Tu Descripción"
                rows={3}
                {...register("description", {
                  required: "La descripción es obligatoria",
                })}
              />
              {errors.description && (
                <div className="invalid-feedback">
                  {errors.description.message}
                </div>
              )}
            </div>

            {/* Imagen */}
            <div className="mb-3">
              <label htmlFor="imagen" className="form-label">
                Imagen:
              </label>
              <input
                id="imagen"
                type="file"
                className="form-control"
                accept="image/*"
                {...register("imagen")}
              />
            </div>

            {/* Botón */}
            <div className="d-grid">
              <button type="submit" className="btn btn-info text-white fw-bold">
                GUARDAR CAMBIOS
              </button>
            </div>
          </form>
        </div>

        {/* Vista previa de imagen */}
        <div className="col-md-4 d-flex align-items-center justify-content-center mt-4 mt-md-0">
          {preview ? (
            <img
              src={preview}
              alt="Previsualización"
              style={{
                maxWidth: "100%",
                maxHeight: "300px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          ) : (
            <div className="text-muted text-center">Previsualización</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
