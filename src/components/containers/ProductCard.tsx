import { useState } from "react";
import "./styles/ProductCard.css";
import "./styles/ProductModal.css";

export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  id_familia: number;
  imagenes: string[];
  activo: boolean;
  precio_libre: boolean;
  bajo_pedido: boolean;
  desabasto: boolean;
  fyv: boolean;
  iva_excento: boolean;
  ultimas_piezas: boolean;
  vender_sin_stock: boolean;
  visualizacion_web: boolean;
  consultar_cotizador: boolean;
  consultar_te: boolean;
  clave_sat: string;
  condiciones_compra: string;
  indicaciones: string;
  notas_web: string;
  unidad: string;
  unidad_sat: string;
  multiplos_de: number;
  tipo: number;
  tipo_de_cobro: number;
  id_plantilla: number;
  altura_max: number;
  base_max: number;
  agrupar_tiempos: boolean;
  imagen: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(product);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="product-card">
        <div className="product-image-container">
          <img
            src={product.activo == null ? product.imagen : 'http://hiplot.dyndns.org:84/api_dev/'+product.imagen.replace(/\\/g, "/")}
            alt={product?.nombre}
            className="product-image"
          />

          <div className="product-badges">
            {product?.bajo_pedido && <span className="badge badge-new">Bajo Pedido</span>}
            {product?.desabasto && <span className="badge badge-sale">Sin Stock</span>}
            {product?.ultimas_piezas && <span className="badge badge-sale">Últimas Piezas</span>}
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
            <button className="quick-add-btn" disabled={product?.desabasto || !product?.activo}>
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
              {product?.bajo_pedido ? "Solicitar Cotización" : "Agregar al carrito"}
            </button>
          </div>
        </div>

        <div className="product-content">
          <div className="product-category">Código: {product?.codigo}</div>
          <h3 className="product-name">{product?.nombre}</h3>
          <p className="product-description">{product?.descripcion}</p>

          <div className="product-details">
            <div className="product-detail-item">
              <span className="detail-label">Unidad:</span>
              <span className="detail-value">{product?.unidad || "N/A"}</span>
            </div>
            {product?.multiplos_de > 1 && (
              <div className="product-detail-item">
                <span className="detail-label">Múltiplos de:</span>
                <span className="detail-value">{product.multiplos_de}</span>
              </div>
            )}
          </div>

          <div className="product-status">
            {product?.consultar_cotizador && (
              <span className="status-badge status-quote">Consultar Precio</span>
            )}
            {product?.precio_libre && (
              <span className="status-badge status-free">Precio Libre</span>
            )}
            {!product?.activo && (
              <span className="status-badge status-inactive">Inactivo</span>
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
                <img
                  src={product.activo == null ? product.imagen : 'http://hiplot.dyndns.org:84/api_dev/'+product.imagen.replace(/\\/g, "/")}
                  alt={product?.nombre}
                />
              </div>

              <div className="modal-info">
                <div className="product-code">
                  <strong>{product?.codigo}</strong>
                </div>

                <h3 className="modal-product-name">
                  {product?.nombre}
                </h3>

                <div className="modal-section">
                  <h4>Descripción:</h4>
                  <p>{product?.descripcion}</p>
                </div>

                {product?.indicaciones && (
                  <div className="modal-section">
                    <h4>Indicaciones:</h4>
                    <p>{product.indicaciones}</p>
                  </div>
                )}

                <div className="product-details">
                  <div className="detail-item">
                    <span className="detail-label">Unidad</span>
                    <span className="detail-value">{product?.unidad || "N/A"}</span>
                  </div>

                  {product?.multiplos_de > 1 && (
                    <div className="detail-item">
                      <span className="detail-label">Múltiplos de</span>
                      <span className="detail-value">{product.multiplos_de} piezas</span>
                    </div>
                  )}

                  {product?.clave_sat && (
                    <div className="detail-item">
                      <span className="detail-label">Clave SAT</span>
                      <span className="detail-value">{product.clave_sat}</span>
                    </div>
                  )}

                  <div className="detail-item">
                    <span className="detail-label">Estado</span>
                    <span className="detail-value">
                      {product?.activo ? "Activo" : "Inactivo"}
                    </span>
                  </div>
                </div>

                <div className="modal-status">
                  {product?.consultar_cotizador && (
                    <span className="status-badge status-quote">Consultar Precio</span>
                  )}
                  {product?.precio_libre && (
                    <span className="status-badge status-free">Precio Libre</span>
                  )}
                  {product?.bajo_pedido && (
                    <span className="status-badge status-order">Bajo Pedido</span>
                  )}
                </div>

                <button className="modal-add-to-cart" disabled={product?.desabasto || !product?.activo}>
                  {product?.bajo_pedido ? "Solicitar Cotización" : "Agregar al carrito"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductCard;
