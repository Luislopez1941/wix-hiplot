import { useState } from "react";
import "./styles/WhatsAppButton.css";

interface ContactLocation {
  name: string;
  phone: string;
  image: string;
}

const contactLocations: ContactLocation[] = [
  {
    name: "Chichen",
    phone: "+52-998-227-3168",
    image:
      "https://sellosycuadros.com/uploads/hiplot/d856c9b8-ee30-47c0-9814-e86914b28635.png",
  },
  {
    name: "Palenque",
    phone: "+52-998-111-4146",
    image:
      "https://sellosycuadros.com/uploads/hiplot/fedd8178-1dc8-450d-9aad-50b56d9d580f.png",
  },
  {
    name: "Xcaret",
    phone: "+52-998-441-1842",
    image:
      "https://sellosycuadros.com/uploads/hiplot/1869410e-3fe0-4719-ad63-e6c78e698ac4.png",
  },
  {
    name: "Playa",
    phone: "+52-984-202-1158",
    image:
      "https://sellosycuadros.com/uploads/hiplot/ed482f42-9777-4691-9f4d-583a92138284.png",
  },
  {
    name: "Tulum",
    phone: "+52-984-254-2382",
    image:
      "https://sellosycuadros.com/uploads/hiplot/aed7042f-6957-4847-9a1c-df94a286a6b8.png",
  },
];

export default function WhatsAppContact() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleContactClick = (location: ContactLocation) => {
    const message = encodeURIComponent(
      `Hola! Me gustaría información sobre ${location.name}`,
    );
    const whatsappUrl = `https://wa.me/${location.phone.replace(/[^0-9]/g, "")}?text=${message}`;
    window.open(whatsappUrl, "_blank");
    setIsMenuOpen(false);
  };

  return (
    <div className="whatsapp-container">
      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="whatsapp-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Contact Menu */}
      {isMenuOpen && (
        <div className="whatsapp-menu-container">
          <div className="whatsapp-menu">
            <div className="whatsapp-menu-header">
              <h3 className="whatsapp-menu-title">
                Aquí puedes ponerte en contacto con nosotros. ¡Con gusto te
                atenderemos!
              </h3>
            </div>

            <div className="whatsapp-locations-grid">
              {contactLocations.map((location) => (
                <div
                  key={location.name}
                  className="whatsapp-location-card"
                  onClick={() => handleContactClick(location)}
                >
                  <div className="whatsapp-location-image">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="whatsapp-image"
                    />
                  </div>
                  <div className="whatsapp-location-info">
                    <h4 className="whatsapp-location-name">{location.name}</h4>
                    <div className="whatsapp-contact-row">
                      <svg
                        className="whatsapp-phone-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                      </svg>
                      <span className="whatsapp-contact-text">Contactar</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* WhatsApp Button */}
      <button
        className="whatsapp-button"
        onClick={toggleMenu}
        aria-label="Contactar por WhatsApp"
      >
        <svg
          className="whatsapp-svg-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.891 3.688" />
        </svg>
      </button>
    </div>
  );
}
