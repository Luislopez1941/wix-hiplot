import React from "react";
import "./styles/Description.css";

const Description: React.FC<any> = ({ item }) => {
  // Valores por defecto para el diseño


  // Combinar datos del prop con valores por defecto



  return (
    <div
      className="description-section"
      style={{
        backgroundColor: item?.style?.background,
        // minHeight: item?.contenido?.style?.heightContainer,
      }}
      >
      <div className="description-container">
        <div
          className="description-image"
          style={{ backgroundImage: `url(${item.contenido.image?.image})`, order: item?.contenido?.image?.styles?.order,
            borderRadius: item?.contenido?.image?.styles?.border
          }}>
          <div className="description-image-overlay"></div>
        </div>

        <div className="description-content">
          <div className="description-text">
            <h2
              className="description-title"
              style={{ fontSize: `${item?.contenido?.title.styles?.font_fize}px`, fontWeight: item?.contenido?.title.styles?.font_weight, color: item?.contenido?.title.styles?.color }}>
              {item.contenido.title.text}
            </h2>
            <p className="description-text-content"
              style={{ fontSize: `${item?.contenido?.description?.styles.font_fize}px`, fontWeight: item?.contenido?.style?.description?.font_weight, color: item?.contenido?.style?.description?.color }}>
              {item.contenido.description.text}
            </p>

            <div className="description-features">
              <div className="description-feature">
                <div className="description-feature-icon">✓</div>
                <span>Acabados premium</span>
              </div>
              <div className="description-feature">
                <div className="description-feature-icon">✓</div>
                <span>Entrega rápida</span>
              </div>
              <div className="description-feature">
                <div className="description-feature-icon">✓</div>
                <span>Garantía de calidad</span>
              </div>
            </div>

            <button className="description-cta">
              <span>Conocer más</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
