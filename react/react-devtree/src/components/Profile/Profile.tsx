import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useUser } from '../../Context/UserContext';

const ProfileComponent = () => {
  const user = useUser();
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    defaultValues: {
      handle: '',
      descripcion: '',
      imagen: null,
    },
  });

  // Establecer valores iniciales cuando el usuario esté disponible
  useEffect(() => {
    if (user) {
      setValue('handle', user.handle || '');
      setValue('descripcion', user.descripcion || '');

      // Si el usuario ya tiene imagen, mostrarla como preview
      if (user.imagenUrl) {
        setPreview(user.imagenUrl);
      }
    }
  }, [user, setValue]);

  // Previsualización de imagen
  const imageFile = watch('imagen');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: any) => {
    console.log('Formulario enviado:', data);
    // Aquí puedes procesar el envío, por ejemplo:
    // - Subir imagen
    // - Llamar a API para actualizar el perfil
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {/* Formulario */}
        <div
          className="col-md-6"
          style={{
            backgroundColor: '#f9f9f9',
            padding: '2rem',
            borderRadius: '8px',
          }}
        >
          <h5 className="text-center mb-4">Editar Información</h5>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Handle */}
            <div className="mb-3">
              <label className="form-label">Handle:</label>
              <input
                type="text"
                className={`form-control ${errors.handle ? 'is-invalid' : ''}`}
                placeholder="handle o Nombre de Usuario"
                {...register('handle', {
                  required: 'Este campo es obligatorio',
                })}
              />
              {errors.handle && (
                <div className="invalid-feedback">{errors.handle.message}</div>
              )}
            </div>

            {/* Descripción */}
            <div className="mb-3">
              <label className="form-label">Descripción:</label>
              <textarea
                className={`form-control ${errors.descripcion ? 'is-invalid' : ''}`}
                placeholder="Tu Descripción"
                rows={3}
                {...register('descripcion', {
                  required: 'La descripción es obligatoria',
                })}
              />
              {errors.descripcion && (
                <div className="invalid-feedback">
                  {errors.descripcion.message}
                </div>
              )}
            </div>

            {/* Imagen */}
            <div className="mb-3">
              <label className="form-label">Imagen:</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                {...register('imagen')}
                onChange={handleImageChange}
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
                maxWidth: '100%',
                maxHeight: '300px',
                borderRadius: '8px',
                objectFit: 'cover',
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
