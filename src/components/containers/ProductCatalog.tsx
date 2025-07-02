import { useState, useMemo, useEffect } from "react";
import ProductCard from "./ProductCard";
import "./styles/ProductCatalog.css";
import type { Product } from "./ProductCard";
import APIs from "../../services/services/APIs";

// Las categorías se generan dinámicamente desde los productos

const sortOptions = [
  { label: "Más relevantes", value: "relevance" },
  { label: "Precio: menor a mayor", value: "price-low" },
  { label: "Precio: mayor a menor", value: "price-high" },
  { label: "Mejor calificados", value: "rating" },
  { label: "Más nuevos", value: "newest" },
];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Se obtienen las familias desde la API al montar el componente.
  // Luego, al hacer clic en una familia, se actualiza el estado `products`
  // con los productos correspondientes a esa familia.
  const [families, setFamilies] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const response: any = await APIs.getFamilies(3);
        setFamilies(response || []);

        // Opcional: cargar los productos de la primera familia por defecto
        if (response?.length > 0) {
          const data = {
            id: 0,
            activos: true,
            nombre: '',
            codigo: '',
            familia: 0,
            proveedor: 0,
            materia_prima: 99,
            get_sucursales: false,
            get_proveedores: false,
            get_max_mins: false,
            get_plantilla_data: false,
            get_areas_produccion: false,
            coleccion: false,
            id_coleccion: 0,
            get_stock: false,
            get_web: false,
            get_unidades: false,
            for_vendedor: true,
            page: 1,
            id_usuario: 34,
            light: true
          };

          const result: any = await APIs.getArticlesForVendedor(data);
          setProducts(result || []);
        }
      } catch (error) {
        console.error("Error loading initial data:", error);
        setFamilies([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetch();
  }, []);

  // Usar las primeras 10 familias como categorías
  const categoriesFromFamilies = useMemo(() => {
    return families?.slice(0, 10) || [];
  }, [families]);

  // Filtrado + Ordenamiento
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products?.filter((product: Product) => {
      const matchesSearch =
        product?.nombre?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        product?.descripcion?.toLowerCase()?.includes(searchTerm.toLowerCase()) ||
        product?.codigo?.toLowerCase()?.includes(searchTerm.toLowerCase());

      const matchesCategory = true; // No filtrar por categoría ya que se maneja por familias

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "price-low":
        // Ordenar por ID (como referencia de precio temporal)
        filtered?.sort((a, b) => (a?.id || 0) - (b?.id || 0));
        break;
      case "price-high":
        filtered?.sort((a, b) => (b?.id || 0) - (a?.id || 0));
        break;
      case "rating":
        // Ordenar por productos activos primero
        filtered?.sort((a, b) => (b?.activo ? 1 : 0) - (a?.activo ? 1 : 0));
        break;
      case "newest":
        // Ordenar por ID descendente (más nuevos primero)
        filtered?.sort((a, b) => (b?.id || 0) - (a?.id || 0));
        break;
      default:
        // Ordenar alfabéticamente por nombre
        filtered?.sort((a, b) => a?.nombre?.localeCompare(b?.nombre || "") || 0);
        break;
    }

    return filtered || [];
  }, [products, searchTerm, selectedCategory, sortBy]);

  const handleProductChange = async (family: any) => {
    try {
      setLoading(true);
      const data = {
        id: 0,
        activos: true,
        nombre: '',
        codigo: '',
        familia: family?.id,
        proveedor: 0,
        materia_prima: 99,
        get_sucursales: false,
        get_proveedores: false,
        get_max_mins: false,
        get_plantilla_data: false,
        get_areas_produccion: false,
        coleccion: false,
        id_coleccion: 0,
        get_stock: false,
        get_web: false,
        get_unidades: false,
        for_vendedor: true,
        page: 1,
        id_usuario: 34,
        light: true
      };

      const result: any = await APIs.getArticlesForVendedor(data);
      setProducts(result || []);
    } catch (error) {
      console.error("Error loading products:", error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="catalog-container">
      {/* Header */}
      <div className="catalog-header">
        <div className="container">
          <h1 className="catalog-title">Catálogo de Productos</h1>
          <p className="catalog-subtitle">
            Descubre nuestra amplia selección de productos de alta calidad
          </p>
        </div>
      </div>

      <div className="container">
        {/* Filtros */}
        <div className="filters-section">
          <div className="search-container">
            <svg
              className="search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="controls-row">
            <div className="categories-container">
              {categoriesFromFamilies?.map((family: any) => (
                <button
                  key={family?.id}
                  className="category-badge"
                  onClick={() => handleProductChange(family)}
                  disabled={loading}
                >
                  {family?.nombre}
                </button>
              ))}
            </div>

            <div className="controls-right">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>

              <div className="view-mode-toggle">
                <button
                  className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                  onClick={() => setViewMode("grid")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <rect
                      x="3"
                      y="3"
                      width="7"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="14"
                      y="3"
                      width="7"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="14"
                      y="14"
                      width="7"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <rect
                      x="3"
                      y="14"
                      width="7"
                      height="7"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
                <button
                  className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                  onClick={() => setViewMode("list")}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <line
                      x1="8"
                      y1="6"
                      x2="21"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="12"
                      x2="21"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="8"
                      y1="18"
                      x2="21"
                      y2="18"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="3"
                      y1="6"
                      x2="3.01"
                      y2="6"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="3"
                      y1="12"
                      x2="3.01"
                      y2="12"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <line
                      x1="3"
                      y1="18"
                      x2="3.01"
                      y2="18"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="results-count">
          <p>
            Mostrando {filteredAndSortedProducts?.length || 0} productos
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Cargando productos...</p>
          </div>
        )}

        {/* Grid de productos */}
        {!loading && (
          <div
            className={`products-grid ${viewMode === "list" ? "list-view" : ""}`}
          >
            {filteredAndSortedProducts?.map((product) => (
              <ProductCard key={product?.id} product={product} />
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {!loading && filteredAndSortedProducts?.length === 0 && (
          <div className="empty-state">
            <svg
              className="empty-icon"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <h3 className="empty-title">No se encontraron productos</h3>
            <p className="empty-description">
              Intenta cambiar los filtros o términos de búsqueda
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
