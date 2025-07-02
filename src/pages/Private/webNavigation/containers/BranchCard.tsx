import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";
import "./styles/BranchCard.css";

export function BranchCards() {
  const handlePhoneClick = () => {
    window.open(`tel:+5219988841201`, "_blank");
  };

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/5219988841201`, "_blank");
  };

  const handleLocationClick = () => {
    (window as any).openLocationModal?.();
  };

  const handleScheduleClick = () => {
    (window as any).openScheduleModal?.();
  };

  return (
    <div className="branch-card">
      <div className="branch-card-content">
        {/* Imagen circular de la sucursal */}
        <div className="branch-image-container">
          <div className="branch-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop&crop=center"
              alt="Sucursal"
              className="branch-image"
              onError={(e) => {
                // Fallback para imágenes que no cargan
                e.currentTarget.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 24 24' fill='none' stroke='%23002539' stroke-width='1' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'/%3E%3Cpolyline points='9,22 9,12 15,12 15,22'/%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>

        {/* Información de la sucursal */}
        <div className="branch-info">
          <h3 className="branch-name">SUC. CHICHEN</h3>
          <p className="branch-address">
            Av. Chichen Itzá L.2 Esq. Estrella Sm 27 Cancún Q. Roo, México.
          </p>
        </div>

        {/* Botones de información */}
        <div className="branch-info-buttons">
          <button
            onClick={handleLocationClick}
            className="branch-button branch-button-primary"
          >
            <MapPin className="branch-button-icon" />
            <span>Ubicación</span>
          </button>

          <button
            onClick={handleScheduleClick}
            className="branch-button branch-button-primary"
          >
            <Clock className="branch-button-icon" />
            <span>Horarios</span>
          </button>
        </div>

        {/* Botones de contacto */}
        <div className="branch-contact-buttons">
          <button
            onClick={handlePhoneClick}
            className="branch-button branch-button-orange"
          >
            <Phone className="branch-button-icon" />
            <span>Llamar</span>
          </button>

          <button
            onClick={handleWhatsAppClick}
            className="branch-button branch-button-green"
          >
            <MessageCircle className="branch-button-icon" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Efecto de fondo animado */}
      <div className="branch-card-hover-effect" />
    </div>
  );
}
