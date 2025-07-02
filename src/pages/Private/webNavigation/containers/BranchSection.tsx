import { BranchCards } from "./BranchCard";
import "./styles/BranchSection.css";

export function BranchSection() {
  return (
    <div className="branch-section">
      {/* Grid de tarjetas */}
      <div className="branch-grid">
        {[1, 2, 3, 4, 5].map((id) => (
          <div key={id} className="branch-grid-item">
            <BranchCards />
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="branch-cta">
        <div className="branch-cta-content">
          <h2 className="branch-cta-title">¿No encuentras tu ubicación?</h2>
          <p className="branch-cta-description">
            Contáctanos y te ayudaremos a encontrar la sucursal más conveniente
            para ti.
          </p>
          <div className="branch-cta-buttons">
            <button className="branch-cta-button branch-cta-button-primary">
              Contactar Ahora
            </button>
            <button className="branch-cta-button branch-cta-button-secondary">
              Ver Mapa General
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
