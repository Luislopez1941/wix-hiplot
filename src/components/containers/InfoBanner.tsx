import React from "react";
import { Package, ArrowRight } from "lucide-react";
import "./styles/InfoBanner.css";

interface InfoBannerProps {
  message?: string;
  type?: "info" | "success" | "warning";
  showIcon?: boolean;
}

const InfoBanner: React.FC<InfoBannerProps> = ({item,  showIcon = true, type = "info",}: any) => {

  const handleCTAClick = () => {
    // Scroll to products section
    const cardsSection = document.querySelector('.cards-section');
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`info-banner info-banner--${type}`}>
      <div className="info-banner__container">
        {/* Lado izquierdo - Icono grande y mensaje */}
        <div className="info-banner__left">
          <div className="info-banner__icon-wrapper">
            {showIcon && (
              <div className="info-banner__icon">
                <Package size={48} />
              </div>
            )}
          </div>

          <div className="info-banner__text-content">
            <h3 className="info-banner__title">{item?.contenido?.title}</h3>
            <p className="info-banner__subtitle">
              Gafetes profesionales y tarjetas personalizadas con acabados premium
            </p>
          </div>
        </div>



        {/* Lado derecho - Acciones */}
        <div className="info-banner__right">
          <button className="info-banner__cta" onClick={handleCTAClick}>
            <span>Explorar</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InfoBanner;
