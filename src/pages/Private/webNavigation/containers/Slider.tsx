import React from "react";
import "./styles/Slider.css";





const Slider: React.FC<any> = ({item, speed = 30}: any) => {
  console.log('item de slilder',item)
  
  return (
    <section className="logo-slider-section">
      <div className="logo-slider-container">
        {/* Header */}
        <div className="logo-slider-header">
          <h2 className="logo-slider-title"
          style={{ fontSize: `${item?.contenido?.title.styles?.font_fize}px`, fontWeight: item?.contenido?.title.styles?.font_weight, color: item?.contenido?.title.styles?.color }}
          >{item?.contenido?.title?.text}</h2>
          <p className="logo-slider-subtitle"
          style={{ fontSize: `${item?.contenido?.description?.styles.font_fize}px`, fontWeight: item?.contenido?.description?.styles.font_weight, color: item?.contenido?.description?.styles.color }}
          >{item?.contenido?.description?.text}</p>
        </div>

        {/* Slider */}
        <div className="logo-slider-wrapper">
          <div
            className="logo-slider-track"
            style={{
              animationDuration: `${speed}s`,
            }}
          >
            {/* Primera ronda de logos */}
            {item?.contenido?.data?.map((logo: any) => (
              <div key={`first-${logo.id}`} className="logo-slider-item">
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="logo-slider-image"
                />
                <div className="logo-slider-overlay">
                  <span className="logo-slider-name">{logo.name}</span>
                </div>
              </div>
            ))}

            {/* Segunda ronda para loop infinito */}
            {item?.contenido?.data?.map((logo: any) => (
              <div key={`second-${logo.id}`} className="logo-slider-item">
                <img
                  src={logo.image}
                  alt={logo.name}
                  className="logo-slider-image"
                />
                <div className="logo-slider-overlay">
                  <span className="logo-slider-name">{logo.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="logo-slider-stats">
          <div className="logo-slider-stat">
            <span className="logo-slider-stat-number">500+</span>
            <span className="logo-slider-stat-label">Empresas</span>
          </div>
          <div className="logo-slider-stat">
            <span className="logo-slider-stat-number">15</span>
            <span className="logo-slider-stat-label">Años de experiencia</span>
          </div>
          <div className="logo-slider-stat">
            <span className="logo-slider-stat-number">98%</span>
            <span className="logo-slider-stat-label">Satisfacción</span>
          </div>
        </div>
      </div>
    </section>
  );
};


export default Slider;
