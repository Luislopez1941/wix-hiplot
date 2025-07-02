import React, { useRef, useEffect, useState } from "react";
import "./styles/Carousel.css";
import { sampleArticles } from "./data/sampleData";


const ModernCarousel: React.FC<any> = ({
  item,
  title,
  articles: propArticles,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Use provided articles or sample data
  useEffect(() => {
    if (propArticles) {
      setArticles(propArticles);
    } else {
      // Simulate loading with sample data
      setLoading(true);
      setTimeout(() => {
        setArticles(sampleArticles);
        setLoading(false);
      }, 1000);
    }
  }, [propArticles, item]);

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", checkScrollButtons);
      return () => carousel.removeEventListener("scroll", checkScrollButtons);
    }
  }, [articles]);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newScrollLeft =
        carouselRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      carouselRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const familyName = title || item?.familia || "Productos";

  if (loading) {
    return (
      <div
        className="carousel-container"
        style={{ backgroundColor: item?.style?.background_color }}
      >
        <div>
          <div className="carousel-header">
            <h2 className="carousel-title">{familyName}</h2>
            <div className="carousel-title-underline"></div>
          </div>
          <div className="loading-state">
            <div className="loading-cards">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="loading-card">
                  <div className="loading-image"></div>
                  <div className="loading-content">
                    <div className="loading-title"></div>
                    <div className="loading-description"></div>
                    <div className="loading-description short"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && articles.length === 0) {
    return (
      <div className="carousel-container" style={{ backgroundColor: item?.style?.background_color }}
      >
        <div>
          <div className="carousel-header">
            <h2 className="carousel-title">{familyName}</h2>
            <div className="carousel-title-underline"></div>
          </div>
          <div className="empty-state">
            <div className="empty-state-icon">
              <div className="empty-state-placeholder"></div>
            </div>
            <h3 className="empty-state-title">No hay productos disponibles</h3>
            <p className="empty-state-description">
              Actualmente no hay productos en esta categoría.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="carousel"
      style={{ backgroundColor: item?.style?.background_color }}
    >
      <div className="carousel-container">
        <div>
          {/* Header */}
          <div className="carousel-header">
            <h2 className="carousel-title">{familyName}</h2>
            <div className="carousel-title-underline"></div>
          </div>

          {/* Carousel Container */}
          <div className="carousel-wrapper">
            {/* Navigation Buttons */}
            <button
              className={`nav-button nav-button-left ${!canScrollLeft ? "nav-button-disabled" : ""}`}
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="15,18 9,12 15,6"></polyline>
              </svg>
            </button>

            <button
              className={`nav-button nav-button-right ${!canScrollRight ? "nav-button-disabled" : ""}`}
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="9,18 15,12 9,6"></polyline>
              </svg>
            </button>

            {/* Carousel */}
            <div ref={carouselRef} className="carousel-scroll">
              {articles.map((article, index) => (
                <div key={article.id || index} className="carousel-card">
                  {/* Image Container */}
                  <div className="card-image-container">
                    <div className="card-image-wrapper">
                      {article.imagenes && article.imagenes[0] ? (
                        <img
                          src={article.imagenes[0].img_url}
                          alt={article.nombre}
                          className="card-image"
                          draggable="false"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src =
                              "/placeholder.svg?height=240&width=320&query=product+image";
                          }}
                        />
                      ) : (
                        <div className="card-image-placeholder">
                          <img
                            src="/placeholder.svg?height=240&width=320&query=product+placeholder"
                            alt="Placeholder"
                            className="card-image"
                            draggable="false"
                          />
                        </div>
                      )}
                    </div>
                    <div className="card-overlay"></div>
                  </div>

                  {/* Content */}
                  <div className="card-content">
                    <h3 className="card-title">{article.nombre}</h3>
                    <p className="card-description">{article.descripcion}</p>

                    {/* Action Button */}
                    <div className="card-action">
                      <button className="card-button">Ver detalles</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Scroll Indicators */}
            {articles.length > 0 && (
              <div className="scroll-indicators">
                {Array.from({ length: Math.ceil(articles.length / 3) }).map(
                  (_, index) => (
                    <div key={index} className="scroll-indicator">
                      <div className="scroll-indicator-fill"></div>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernCarousel;
