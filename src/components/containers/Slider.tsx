import React from "react";
import "./styles/Slider.css";

interface Logo {
  id: string;
  name: string;
  image: string;
  website?: string;
}

interface LogoSliderProps {
  title?: string;
  subtitle?: string;
  logos?: Logo[];
  speed?: number; // seconds for one complete cycle
}

const Slider: React.FC<LogoSliderProps> = ({
  title = "Empresas que confían en nosotros",
  subtitle = "Más de 500 empresas han elegido nuestros servicios profesionales",
  logos = defaultLogos,
  speed = 30,
}) => {
  return (
    <section className="logo-slider-section">
      <div className="logo-slider-container">
        {/* Header */}
        <div className="logo-slider-header">
          <h2 className="logo-slider-title">{title}</h2>
          <p className="logo-slider-subtitle">{subtitle}</p>
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
            {logos.map((logo) => (
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
            {logos.map((logo) => (
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

// Logos de muestra (puedes reemplazar con logos reales)
const defaultLogos: Logo[] = [
  {
    id: "1",
    name: "TechCorp",
    image:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=200&h=100&fit=crop",
  },
  {
    id: "2",
    name: "GlobalSoft",
    image:
      "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
  },
  {
    id: "3",
    name: "Innovate Inc",
    image:
      "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
  },
  {
    id: "4",
    name: "Digital Plus",
    image:
      "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=200&h=100&fit=crop",
  },
  {
    id: "5",
    name: "FutureTech",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&h=100&fit=crop",
  },
  {
    id: "6",
    name: "Smart Solutions",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200&h=100&fit=crop",
  },
  {
    id: "7",
    name: "Pro Systems",
    image:
      "https://images.unsplash.com/photo-1553028826-f4804151e626?w=200&h=100&fit=crop",
  },
  {
    id: "8",
    name: "Elite Group",
    image:
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&h=100&fit=crop",
  },
];

export default Slider;
