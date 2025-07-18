import React from "react";
import { ArrowRight } from "lucide-react";
import "./styles/InfoBanner.css";



const InfoBanner: React.FC<any> = ({ item }) => {

  const handleCTAClick = () => {
    // Scroll to products section
    const cardsSection = document.querySelector('.cards-section');
    if (cardsSection) {
      cardsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  console.log('itemsssssssssssssssssss', item)

  return (
    <div className={`info-banner info-banner`} style={{ background: item.style?.background}}>
      <div className="info-banner__container">
        {/* Lado izquierdo - Icono grande y mensaje */}
        <div className="info-banner__left">
          <div className="info-banner__icon-wrapper">
              <div className="info-banner__icon" style={{background: item.contenido?.icono?.styles?.background}}>
                <img src={item?.contenido?.icono?.icono} alt="" />
              </div>
          
          </div>
          <div className="info-banner__text-content">
            <h3
              className="info-banner__title"
              style={{ color: item?.contenido?.title?.styles?.color, fontSize: `${item.contenido.title.styles.font_size}px`}}>
              {item?.contenido?.title?.text}
            </h3>
            <p
              className="info-banner__subtitle"
              style={{ color: item?.contenido?.subtitle?.styles?.color, fontSize: `${item.contenido.subtitle.styles.font_size}px`}}>
              {item?.contenido?.subtitle?.text}
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
