import React, { useState, useEffect } from "react";
import { Search, Eye } from "lucide-react";
import "./styles/ProductCatalog.css";
import APIs from "../../services/services/APIs";
import useUserStore from "../../zustand/General";
import ProductModal from "./modal-catalog/ProductModal";

interface Product {
  id: number;
  codigo: string;
  nombre: string;
  descripcion: string;
  precio: number;
  imagen: string;
  familia: number;
  coleccion: number;
  rating: number;
  destacado: boolean;
}

const ProductCatalog: React.FC = () => {
  const [selectedFamilia, setSelectedFamilia] = useState<number | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const userId = useUserStore((state) => state.user.id);
  const [families, setFamilies] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);

  const url_img = useUserStore((state) => state.url_img);

  // Cargar familias al montar el componente
  const loadFamilies = async () => {
    try {
      setLoading(true);
      const familiesData: any = await APIs.getFamilies(userId);
      setFamilies(familiesData);
      
      // Si hay familias, seleccionar la primera y cargar sus colecciones
      if (familiesData && familiesData.length > 0) {
        setSelectedFamilia(familiesData[0].id);
        await loadCollections(familiesData[0].id);
      }
    } catch (error) {
      console.error("Error cargando familias:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar colecciones de una familia específica
  const loadCollections = async (familiaId: number) => {
    try {
      setLoading(true);
      const collectionsData: any = await APIs.getCollectionByFamily(familiaId);
      setCollections(collectionsData);
      
      // Limpiar selección de colección
      setSelectedCollection(null);
      
      // Si hay colecciones, seleccionar la primera y cargar sus productos
      if (collectionsData && collectionsData.length > 0) {
        setSelectedCollection(collectionsData[0].id);
        await loadProducts(familiaId, collectionsData[0].id);
      } else {
        // Si no hay colecciones, limpiar productos
        setProducts([]);
        setFilteredProducts([]);
      }
    } catch (error) {
      console.error("Error cargando colecciones:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar productos de una colección específica
  const loadProducts = async (familiaId: number, collectionId: number) => {
    try {
      setLoading(true);
      const data = {
        id: 0,
        activos: true,
        nombre: "",
        codigo: "",
        familia: 0,
        proveedor: 0,
        materia_prima: 99,
        get_sucursales: false,
        get_proveedores: false,
        get_max_mins: false,
        get_plantilla_data: false,
        get_areas_produccion: false,
        coleccion: false,
        id_coleccion: collectionId,
        get_stock: false,
        get_web: true,
        get_unidades: false,
        for_vendedor: true,
        page: 1,
        id_usuario: userId,
        light: true,
      };
      
      const result: any = await APIs.getArticlesForVendedor(data);
      const productsData = result.data || result || [];
      
      // Transformar los datos de la API al formato que espera el componente
      const transformedProducts: Product[] = productsData.map(
        (product: any) => ({
          id: product.id,
          codigo: product.codigo || "",
          nombre: product.nombre || product.descripcion || "",
          descripcion: product.descripcion || "",
          precio: product.precio || 0,
          imagen: product.imagen || "/api/placeholder/200/200",
          familia: product.familia || familiaId,
          coleccion: product.coleccion || collectionId,
          rating: product.rating || 4.0,
          destacado: product.destacado || false,
        }),
      );
      
      setProducts(transformedProducts);
      setFilteredProducts(transformedProducts);
    } catch (error) {
      console.error("Error cargando productos:", error);
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFamilies();
  }, [userId]);

  // Manejar clic en familia
  const handleFamiliaClick = async (familiaId: number) => {
    if (selectedFamilia === familiaId) {
      // Si ya está seleccionada, deseleccionar
      setSelectedFamilia(null);
      setSelectedCollection(null);
      setCollections([]);
      setProducts([]);
      setFilteredProducts([]);
    } else {
      // Seleccionar nueva familia
      setSelectedFamilia(familiaId);
      await loadCollections(familiaId);
    }
  };

  // Manejar clic en colección
  const handleCollectionClick = async (collectionId: number) => {
    if (selectedCollection === collectionId) {
      // Si ya está seleccionada, deseleccionar
      setSelectedCollection(null);
      setProducts([]);
      setFilteredProducts([]);
    } else {
      // Seleccionar nueva colección
      setSelectedCollection(collectionId);
      if (selectedFamilia) {
        await loadProducts(selectedFamilia, collectionId);
      }
    }
  };

  // Manejar clic en producto para abrir modal
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Filtrar productos por término de búsqueda
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.descripcion.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  return (
    <div className="product-catalog">
      {/* Main Content */}
      <div className="main-content">
        {/* Content Below Header */}
        <div className="content-below-header">
          {/* Sidebar - Familias */}
          <div className="sidebar">
            <div className="sidebar-header">
              <h2>FAMILIAS</h2>
            </div>
            <div className="familia-list">
              {loading ? (
                <div className="loading">Cargando familias...</div>
              ) : (
                families.map((familia) => (
                  <div
                    key={familia.id}
                    className={`familia-item ${selectedFamilia === familia.id ? "active" : ""}`}
                    onClick={() => handleFamiliaClick(familia.id)}
                  >
                    <span className="familia-name">{familia.nombre}</span>
                    <span className="familia-count">
                      ({familia.count || 0})
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="right-content">
            {/* Collections y Search */}
            <div className="collections-search-section">
              <div className="collections-nav">
                {loading ? (
                  <div className="loading">Cargando colecciones...</div>
                ) : (
                  collections.map((collection) => (
                    <button
                      key={collection.id}
                      className={`collection-btn ${selectedCollection === collection.id ? "active" : ""}`}
                      onClick={() => handleCollectionClick(collection.id)}
                    >
                      {collection.nombre}
                    </button>
                  ))
                )}
              </div>
              <div className="search-container">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            {/* Products Section */}
            <div className="products-section">
              <div className="products-header">
                <h2 className="products-title">
                  {selectedCollection
                    ? `PRODUCTOS - ${collections.find((c) => c.id === selectedCollection)?.nombre}`
                    : "SELECCIONA UNA COLECCIÓN"}
                </h2>
                <span className="products-count">
                  {filteredProducts.length} productos encontrados
                </span>
              </div>

              {loading ? (
                <div className="loading">Cargando productos...</div>
              ) : (
                <div className="products-grid">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="product-card"
                      onClick={() => handleProductClick(product)}
                      style={{ cursor: 'pointer' }}
                    >
                      <div className="product-image-container">
                        {product.destacado && (
                          <div className="featured-badge">Destacado</div>
                        )}
                        <img src={`${url_img}${product.imagen}`} alt={product.nombre} className="product-image" />
                        <div className="product-overlay">
                          <button className="overlay-btn">
                            <Eye className="icon-sm" />
                          </button>
                        </div>
                      </div>
                      <div className="product-info">
                        <div className="product-code">
                          CÓDIGO: {product.codigo}
                        </div>
                        <h3 className="product-name">{product.nombre}</h3>
                        <p className="product-description">
                          {product.descripcion}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {!loading && filteredProducts.length === 0 && (
                <div className="no-products">
                  <h3>No se encontraron productos</h3>
                  <p>Intenta ajustar tus filtros o términos de búsqueda</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        url_img={url_img}
      />
    </div>
  );
};

export default ProductCatalog;
