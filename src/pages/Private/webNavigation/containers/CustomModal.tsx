import { MapPin, Clock, X } from "lucide-react";
import { useEffect, useState } from "react";
import "./styles/CustomModal.css";

export function BranchModals() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"location" | "schedule">(
    "location",
  );

  // Función para abrir modal de ubicación
  const openLocationModal = () => {
    setModalType("location");
    setIsOpen(true);
  };

  // Función para abrir modal de horarios
  const openScheduleModal = () => {
    setModalType("schedule");
    setIsOpen(true);
  };

  // Función para cerrar modal
  const closeModal = () => {
    setIsOpen(false);
  };

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Exponer funciones globalmente para que las cards las puedan usar
  useEffect(() => {
    (window as any).openLocationModal = openLocationModal;
    (window as any).openScheduleModal = openScheduleModal;
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Botón cerrar */}
        <button className="modal-close-button" onClick={closeModal}>
          <X size={20} color="#6b7280" />
        </button>

        {modalType === "location" && (
          <div className="modal-body">
            {/* Título de ubicación */}
            <div className="location-title">
              <h2>Ver Ubicación</h2>
              <p className="location-address">
                Av. Chichen Itzá L.2 Esq. Estrella Sm 27 Cancún Q. Roo, México.
              </p>
            </div>

            {/* Ícono de mapa */}
            <div className="location-icon-container">
              <div className="location-icon">
                <MapPin size={32} color="white" />
              </div>
            </div>

            {/* Línea separadora */}
            <div className="modal-divider" />

            {/* Información de contacto */}
            <div className="contact-info">
              <h3 className="contact-title">Numero Contacto</h3>
              <div className="contact-icon-container">
                <div className="contact-icon">
                  <svg width="24" height="24" fill="white" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
              </div>
              <p className="contact-phone">9988841201</p>
            </div>
          </div>
        )}

        {modalType === "schedule" && (
          <div className="modal-body">
            {/* Título de horarios */}
            <div className="schedule-title">
              <h2>
                Horarios De Sucursal
                <Clock size={24} color="#ea5234" />
              </h2>
            </div>

            {/* Línea separadora */}
            <div className="schedule-divider" />

            {/* Información de horarios */}
            <div className="schedule-info">
              <h3 className="schedule-weekdays">LUNES A VIERNES</h3>
              <p className="schedule-hours">9:00 AM - 6:00 PM</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
