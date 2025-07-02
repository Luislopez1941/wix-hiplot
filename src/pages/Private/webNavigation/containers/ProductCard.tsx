import { useState } from "react";
import "./styles/ProductCard.css";
import "./styles/ProductModal.css";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
  description: string;
  imagen: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const discount =
    product.originalPrice && product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  console.log(product);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={product.imagen}
            alt={product.name}
            className="product-image"
          />

          <div className="product-badges">
            {product.isNew && <span className="badge badge-new">Nuevo</span>}
            {product.isOnSale && discount > 0 && (
              <span className="badge badge-sale">-{discount}%</span>
            )}
          </div>

          <button className="wishlist-btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Botón Ver Detalles con ícono de ojo */}
          <button className="view-details-btn" onClick={openModal}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </button>
          <div className="quick-add-container">
            <button className="quick-add-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              Agregar al carrito
            </button>
          </div>
        </div>

        <div className="product-content">
          <div className="product-category">{product.category}</div>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>

          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`star ${i < Math.floor(product.rating) ? "star-filled" : ""}`}
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
                </svg>
              ))}
            </div>
            <span className="review-count">({product.reviewCount})</span>
          </div>

          <div className="product-price">
            <span className="current-price">
              ${product.price ? product.price.toLocaleString() : "0"}
            </span>
            {product.originalPrice && (
              <span className="original-price">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Botón Ver Detalles */}
          <button className="details-btn" onClick={openModal}>
            Ver detalles
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Detalles del Producto</h2>
              <button className="modal-close" onClick={closeModal}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-image">
                <img src={product.imagen} alt={product.name} />
              </div>

              <div className="modal-info">
                <div className="product-code">
                  <strong>DVLLM2365150199G</strong>
                </div>

                <h3 className="modal-product-name">
                  LLAVERO FLATEN CON GRABADO LASER
                </h3>

                <div className="modal-section">
                  <h4>Descripción:</h4>
                  <p>{product.description}</p>
                </div>

                <div className="product-details">
                  <div className="detail-item">
                    <span className="detail-label">Pedido mínimo</span>
                    <span className="detail-value">10 piezas</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Precio</span>
                    <span className="detail-value">unitario</span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Incluye</span>
                    <span className="detail-value">
                      grabado laser y llavero
                    </span>
                  </div>

                  <div className="detail-item">
                    <span className="detail-label">Área de grabado</span>
                    <span className="detail-value">1.7 x 2.9 cm</span>
                  </div>
                </div>

                <div className="modal-price">
                  <span className="modal-current-price">
                    ${product.price ? product.price.toLocaleString() : "0"}
                  </span>
                  {product.originalPrice && (
                    <span className="modal-original-price">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

         
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
