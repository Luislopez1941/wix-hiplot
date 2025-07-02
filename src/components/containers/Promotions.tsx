import "./styles/Promotions.css";

interface Promotion {
  id: number;
  title: string;
  description: string;
  discount: number;
  originalPrice: number;
  currentPrice: number;
  image: string;
  validUntil: string;
  isHot?: boolean;
  isLimited?: boolean;
  category: string;
}

const promotions: Promotion[] = [
  {
    id: 1,
    title: "Impresión Digital Premium",
    description: "Impresión en alta calidad para tus proyectos más importantes",
    discount: 30,
    originalPrice: 150,
    currentPrice: 105,
    image:
      "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
    validUntil: "2024-12-31",
    isHot: true,
    category: "Impresión",
  },
  {
    id: 2,
    title: "Paquete Rótulos Comerciales",
    description: "Diseño + Impresión + Instalación incluida",
    discount: 25,
    originalPrice: 800,
    currentPrice: 600,
    image:
      "https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=400&h=300&fit=crop",
    validUntil: "2024-12-25",
    isLimited: true,
    category: "Rótulos",
  },
  {
    id: 3,
    title: "Offset 1000 Volantes",
    description: "Volantes a todo color en papel couché",
    discount: 40,
    originalPrice: 200,
    currentPrice: 120,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
    validUntil: "2024-12-20",
    isHot: true,
    category: "Offset",
  },
  {
    id: 4,
    title: "Diseño Gráfico Completo",
    description: "Logo + Tarjetas + Papelería empresarial",
    discount: 35,
    originalPrice: 500,
    currentPrice: 325,
    image:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    validUntil: "2024-12-30",
    category: "Diseño",
  },
  {
    id: 5,
    title: "Empaque Premium",
    description: "Cajas personalizadas con acabados especiales",
    discount: 20,
    originalPrice: 300,
    currentPrice: 240,
    image:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    validUntil: "2025-01-15",
    isLimited: true,
    category: "Empaque",
  },
  {
    id: 6,
    title: "Banner Gigantografía",
    description: "Impresión de gran formato resistente al clima",
    discount: 45,
    originalPrice: 400,
    currentPrice: 220,
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
    validUntil: "2024-12-22",
    isHot: true,
    category: "Gran Formato",
  },
];

const Promotions = () => {

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const isExpiringSoon = (dateString: string) => {
    const today = new Date();
    const expiryDate = new Date(dateString);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  return (
    <div className="promotions-container">
      {/* Header */}
      <div className="promotions-header">
        <div className="container">
          <h1 className="promotions-title">PROMOCIONES ESPECIALES</h1>
          <p className="promotions-subtitle">
            Aprovecha nuestras ofertas exclusivas por tiempo limitado
          </p>
        </div>
      </div>

      <div className="container">
        <div className="promotions-content">
          {/* Hero Banner */}
          <div className="hero-banner">
            <div className="hero-content">
              <div className="hero-text">
                <h2>¡OFERTAS NAVIDEÑAS!</h2>
                <p>Hasta 45% de descuento en servicios seleccionados</p>
                <span className="hero-badge">Válido hasta fin de año</span>
              </div>
              <div className="hero-graphic">
                <div className="discount-circle">
                  <span className="discount-text">HASTA</span>
                  <span className="discount-number">45%</span>
                  <span className="discount-off">OFF</span>
                </div>
              </div>
            </div>
          </div>



          {/* Promotions Grid */}
          <div className="promotions-grid">
            {promotions.map((promotion) => (
              <div key={promotion.id} className="promotion-card">
                <div className="promotion-image-container">
                  <img
                    src={promotion.image}
                    alt={promotion.title}
                    className="promotion-image"
                  />

                  <div className="promotion-badges">
                    {promotion.isHot && (
                      <span className="badge badge-hot">🔥 HOT</span>
                    )}
                    {promotion.isLimited && (
                      <span className="badge badge-limited">⏰ LIMITADA</span>
                    )}
                    <span className="badge badge-discount">
                      -{promotion.discount}%
                    </span>
                  </div>

                  <div className="promotion-overlay">
                    <button className="cta-button">¡APROVECHAR OFERTA!</button>
                  </div>
                </div>

                <div className="promotion-content">
                  <div className="promotion-category">{promotion.category}</div>
                  <h3 className="promotion-title">{promotion.title}</h3>
                  <p className="promotion-description">
                    {promotion.description}
                  </p>

                  <div className="promotion-pricing">
                    <div className="price-container">
                      <span className="current-price">
                        ${promotion.currentPrice.toLocaleString()}
                      </span>
                      <span className="original-price">
                        ${promotion.originalPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="savings">
                      Ahorras $
                      {(
                        promotion.originalPrice - promotion.currentPrice
                      ).toLocaleString()}
                    </div>
                  </div>

                  <div
                    className={`promotion-expiry ${isExpiringSoon(promotion.validUntil) ? "expiring-soon" : ""}`}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12,6 12,12 16,14" />
                    </svg>
                    <span>
                      Válida hasta: {formatDate(promotion.validUntil)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>



          {/* CTA Section */}
          <div className="cta-section">
            <div className="cta-content">
              <h3>¿No encuentras lo que buscas?</h3>
              <p>Contáctanos y te haremos una oferta personalizada</p>
              <div className="cta-buttons">
                <button className="cta-primary">Solicitar Cotización</button>
                <button className="cta-secondary">Ver Catálogo Completo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
