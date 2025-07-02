import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import "./styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="company-info">
            <div className="logo-container">
              <div className="logo-icon-wrapper">
                <div className="logo-icon-inner"></div>
              </div>
              <span className="logo-text">Hiplot</span>
            </div>
            <p className="company-description">
              Líderes en servicios de diseño e impresión profesional. Más de 15
              años brindando calidad y confianza a nuestros clientes.
            </p>
            <div className="social-links">
              <Link to="#" className="social-link" aria-label="Facebook">
                <span>f</span>
              </Link>
              <Link to="#" className="social-link" aria-label="Instagram">
                <span>ig</span>
              </Link>
              <Link to="#" className="social-link" aria-label="WhatsApp">
                <span>wa</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="footer-column-title">Contacto</h3>
            <div className="contact-list">
              <a href="tel:+525551234567" className="contact-item">
                <Phone />
                <span>+52 (555) 123-4567</span>
              </a>
              <a href="mailto:info@hiplot.com" className="contact-item">
                <Mail />
                <span>info@hiplot.com</span>
              </a>
              <div className="contact-item">
                <MapPin />
                <span className="contact-item-address">
                  Av. Principal 123
                  <br />
                  Col. Centro, CDMX
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="footer-column-title">Horarios</h3>
            <div className="hours-list">
              <div className="hours-item">
                <span>Lun - Vie:</span>
                <span>8:00 - 19:00</span>
              </div>
              <div className="hours-item">
                <span>Sábado:</span>
                <span>8:00 - 17:00</span>
              </div>
              <div className="hours-item">
                <span>Domingo:</span>
                <span>9:00 - 15:00</span>
              </div>
              <div className="emergency-hours">
                <div className="emergency-title">Atención Personalizada</div>
                <div className="emergency-text">
                  Consultoría disponible con cita previa
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bottom-bar">
          <div className="copyright">
            <p>
              &copy; {new Date().getFullYear()} Hiplot. Todos los derechos
              reservados.
            </p>
          </div>
          <div className="legal-links">
            <Link to="#" className="legal-link">
              Privacidad
            </Link>
            <Link to="#" className="legal-link">
              Términos
            </Link>
            <Link to="#" className="legal-link">
              Garantías
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
