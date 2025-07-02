import { useState } from "react";
import "./styles/Form.css";

interface FormData {
  nombre: string;
  email: string;
  ciudad: string;
  telefono: string;
  mensaje: string;
  archivo: File | null;
}

interface FormErrors {
  nombre?: string;
  email?: string;
  ciudad?: string;
  telefono?: string;
  mensaje?: string;
  archivo?: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    nombre: "",
    email: "",
    ciudad: "",
    telefono: "",
    mensaje: "",
    archivo: null,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    } else if (formData.nombre.trim().length < 2) {
      newErrors.nombre = "El nombre debe tener al menos 2 caracteres";
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El correo electrónico es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Ingrese un correo electrónico válido";
    }

    // Validar ciudad
    if (!formData.ciudad.trim()) {
      newErrors.ciudad = "La ciudad es requerida";
    }

    // Validar teléfono
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!formData.telefono.trim()) {
      newErrors.telefono = "El teléfono es requerido";
    } else if (!phoneRegex.test(formData.telefono.replace(/\s/g, ""))) {
      newErrors.telefono = "Ingrese un teléfono válido";
    }

    // Validar mensaje
    if (!formData.mensaje.trim()) {
      newErrors.mensaje = "El mensaje es requerido";
    } else if (formData.mensaje.trim().length < 10) {
      newErrors.mensaje = "El mensaje debe tener al menos 10 caracteres";
    }

    // Validar archivo
    if (!formData.archivo) {
      newErrors.archivo = "Debe adjuntar un archivo";
    } else {
      const maxSize = 10 * 1024 * 1024; // 10MB
      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (formData.archivo.size > maxSize) {
        newErrors.archivo = "El archivo no debe superar los 10MB";
      } else if (!allowedTypes.includes(formData.archivo.type)) {
        newErrors.archivo =
          "Formato no válido. Use PDF, DOC, DOCX, JPG, PNG o GIF";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Limpiar error del campo si el usuario comienza a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prev) => ({
      ...prev,
      archivo: file,
    }));

    // Limpiar error del archivo
    if (errors.archivo) {
      setErrors((prev) => ({
        ...prev,
        archivo: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Aquí iría la lógica de envío real
      // const response = await submitContactForm(formData);

      // Simular envío
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitSuccess(true);
      setFormData({
        nombre: "",
        email: "",
        ciudad: "",
        telefono: "",
        mensaje: "",
        archivo: null,
      });

      // Reset file input
      const fileInput = document.getElementById("archivo") as HTMLInputElement;
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error al enviar formulario:", error);
      alert("Hubo un error al enviar el formulario. Intente nuevamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-container">
      {/* Header */}
      <div className="contact-header">
        <div className="container">
          <h1 className="contact-title">CONTÁCTANOS</h1>
          <p className="contact-subtitle">Tu opinión nos interesa...</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-content">
          {submitSuccess && (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>¡Mensaje enviado exitosamente!</h3>
              <p>Nos pondremos en contacto contigo pronto.</p>
            </div>
          )}

          <div className="contact-layout">
            {/* Columna izquierda - Formulario */}
            <div className="contact-form-section">
              <form onSubmit={handleSubmit} className="contact-form">
                {/* Nombre */}
                <div className="form-group">
                  <label htmlFor="nombre" className="form-label">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className={`form-input ${errors.nombre ? "error" : ""}`}
                    placeholder="Ingrese su nombre completo"
                  />
                  {errors.nombre && (
                    <span className="error-message">{errors.nombre}</span>
                  )}
                </div>

                {/* Email */}
                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`form-input ${errors.email ? "error" : ""}`}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.email && (
                    <span className="error-message">{errors.email}</span>
                  )}
                </div>

                {/* Ciudad */}
                <div className="form-group">
                  <label htmlFor="ciudad" className="form-label">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    id="ciudad"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleInputChange}
                    className={`form-input ${errors.ciudad ? "error" : ""}`}
                    placeholder="Ingrese su ciudad"
                  />
                  {errors.ciudad && (
                    <span className="error-message">{errors.ciudad}</span>
                  )}
                </div>

                {/* Teléfono */}
                <div className="form-group">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className={`form-input ${errors.telefono ? "error" : ""}`}
                    placeholder="(999) 123-4567"
                  />
                  {errors.telefono && (
                    <span className="error-message">{errors.telefono}</span>
                  )}
                </div>

                {/* Mensaje */}
                <div className="form-group">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje *
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleInputChange}
                    className={`form-textarea ${errors.mensaje ? "error" : ""}`}
                    placeholder="Escriba aquí su mensaje..."
                    rows={5}
                  />
                  {errors.mensaje && (
                    <span className="error-message">{errors.mensaje}</span>
                  )}
                </div>

                {/* Archivo */}
                <div className="form-group">
                  <label htmlFor="archivo" className="form-label">
                    Archivo *
                  </label>
                  <div className="file-input-container">
                    <input
                      type="file"
                      id="archivo"
                      name="archivo"
                      onChange={handleFileChange}
                      className="file-input"
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.gif"
                    />
                    <label htmlFor="archivo" className="file-input-label">
                      <svg
                        className="file-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14,2 14,8 20,8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10,9 9,9 8,9" />
                      </svg>
                      {formData.archivo
                        ? formData.archivo.name
                        : "Seleccionar archivo"}
                    </label>
                  </div>
                  <small className="file-help">
                    Formatos permitidos: PDF, DOC, DOCX, JPG, PNG, GIF (máx.
                    10MB)
                  </small>
                  {errors.archivo && (
                    <span className="error-message">{errors.archivo}</span>
                  )}
                </div>

                {/* Política de privacidad */}
                <div className="privacy-notice">
                  <p>
                    De conformidad con lo previsto en la Ley Orgánica de
                    Protección de Datos de Carácter Personal, le informamos que{" "}
                    <strong>
                      ROTULOS Y OFFSET DE CANCUN S.A. DE C.V. (HIPLOT)
                    </strong>
                    , con domicilio en{" "}
                    <strong>
                      AV. PALENQUE MZA. 1 LOTES 10 Y 11 # 84, SMZA. 27 CANCUN,
                      QUINTANA ROO 77509 México
                    </strong>
                    , es Responsable del tratamiento de sus datos personales,
                    los cuales serán usados a efecto de dar respuesta a las
                    comunicaciones generadas por esta vía y para proveerle los
                    productos o prestarle los servicios que se nos encomienden.
                  </p>
                </div>

                {/* Botón enviar */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`submit-btn ${isSubmitting ? "submitting" : ""}`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner"></span>
                      ENVIANDO...
                    </>
                  ) : (
                    "ENVIAR"
                  )}
                </button>
              </form>
            </div>

            {/* Columna derecha - Información */}
            <div className="contact-info-section">
              <div className="company-header">
                <div className="company-logo">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 7h-9" />
                    <path d="M14 17H5" />
                    <circle cx="17" cy="17" r="3" />
                    <circle cx="7" cy="7" r="3" />
                  </svg>
                </div>
                <div className="company-info">
                  <h3>HIPLOT</h3>
                  <p>Rótulos y Offset de Cancún</p>
                </div>
              </div>

              <div className="info-section">
                <h4>📍 Ubicación</h4>
                <p>
                  AV. PALENQUE MZA. 1, LOTES 10 Y 11 # 84
                  <br />
                  SMZA. 27, CANCUN, QUINTANA ROO 77509
                  <br />
                  México
                </p>
              </div>

              <div className="info-section">
                <h4>📞 Contacto</h4>
                <p>
                  <strong>Teléfono:</strong> (998) 123-4567
                  <br />
                  <strong>Email:</strong> info@hiplot.com.mx
                  <br />
                  <strong>Ventas:</strong> ventas@hiplot.com.mx
                </p>
              </div>

              <div className="info-section">
                <h4>🕒 Horarios</h4>
                <p>
                  <strong>Lunes a Viernes:</strong> 8:00 AM - 6:00 PM
                  <br />
                  <strong>Sábados:</strong> 9:00 AM - 2:00 PM
                </p>
              </div>

              <div className="info-section">
                <h4>🛠️ Servicios</h4>
                <p>
                  Impresión Digital • Offset • Rótulos
                  <br />
                  Diseño Gráfico • Empaque • Entrega
                </p>
              </div>

              <div className="contact-cta">
                <p>
                  ¿Necesitas una cotización rápida?
                  <br />
                  <strong>¡Estamos aquí para ayudarte!</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
