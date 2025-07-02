import React from "react";
import "./styles/Description.css";

const Description: React.FC<any> = ({ item }) => {
  // Valores por defecto para el diseño
  const defaultItem = {
    imagen:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop",
    titulo: "Servicios Profesionales",
    descripcion:
      "Ofrecemos soluciones integrales para tu empresa con la más alta calidad y acabados premium. Nuestro equipo de expertos se encarga de cada detalle para garantizar resultados excepcionales.",
    style: {
      color: "#002539",
      heightContainer: "500px",
      order: { order: 1 },
      border: "12px",
      stutusBackground: false,
      padding: "0",
      title: {
        fontSize: 32,
        fontWeight: 700,
        color: "#ffffff",
      },
      description: {
        fontSize: 16,
        fontWeight: 400,
        color: "#cbd5e1",
      },
    },
  };

  // Combinar datos del prop con valores por defecto
  const data = { ...defaultItem, ...item };
  const style = { ...defaultItem.style, ...item?.style };

  return (
    <div
      className="description-section"
      style={{
        backgroundColor: style.color,
        minHeight: style.heightContainer,
      }}
    >
      <div className="description-container">
        <div
          className="description-image"
          style={{
            backgroundImage: `url(${data.imagen})`,
            order: style.order?.order,
            borderRadius: style.border,
            backgroundColor: style.stutusBackground
              ? "transparent"
              : "rgba(15, 23, 42, 0.8)",
            padding: style.padding,
          }}
        >
          <div className="description-image-overlay"></div>
        </div>

        <div className="description-content">
          <div className="description-text">
            <h2
              className="description-title"
              style={{
                fontSize: `${style.title?.fontSize}px`,
                fontWeight: style.title?.fontWeight,
                color: style.title?.color,
              }}
            >
              {data.titulo}
            </h2>

            <p
              className="description-text-content"
              style={{
                fontSize: `${style.description?.fontSize}px`,
                fontWeight: style.description?.fontWeight,
                color: style.description?.color,
              }}
            >
              {data.descripcion}
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
