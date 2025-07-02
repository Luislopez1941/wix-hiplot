import { useState, useMemo, useEffect } from "react";
import "./styles/ProductCatalog.css";
import APIs from "../../../../services/services/APIs";

// Sample product data


const categories = [
  "Todos",
  "Electrónicos",
  "Audio",
  "Computadoras",
  "Wearables",
  "Tablets",
  "Fotografía",
  "Gaming",
  "Impresión",
  "Redes",
];

const sortOptions = [
  { label: "Más relevantes", value: "relevance" },
  { label: "Precio: menor a mayor", value: "price-low" },
  { label: "Precio: mayor a menor", value: "price-high" },
  { label: "Mejor calificados", value: "rating" },
  { label: "Más nuevos", value: "newest" },
];

const ProductCatalog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortBy, setSortBy] = useState("relevance");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [families, setFamilies] = useState<any>([])

  const fetch = async () => {
    let response = await APIs.getFamilies(3)
    setFamilies(response)
  }

  useEffect(() => {
    fetch()
  }, [])

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = families.filter((product: any) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "Todos" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
    switch (sortBy) {
      case "price-low":
        filtered.sort((a: any, b: any) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a: any, b: any) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a: any, b: any) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a: any, b: any) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, sortBy]);

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
        {/* Filters and Search */}
        <div className="filters-section">
          {/* Search Bar */}
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

          {/* Filter Controls */}
          <div className="controls-row">
            {/* Categories */}
            <div className="categories-container">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-badge ${selectedCategory === category ? "active" : ""
                    }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="controls-right">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* View Mode */}
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

        {/* Results Count */}
        <div className="results-count">
          <p>
            Mostrando {filteredAndSortedProducts.length} productos
            {selectedCategory !== "Todos" && ` en ${selectedCategory}`}
            {searchTerm && ` para "${searchTerm}"`}
          </p>
        </div>

        {/* Products Grid */}
        <div
          className={`products-grid ${viewMode === "list" ? "list-view" : ""}`}
        >
          {/* {filteredAndSortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))} */}
        </div>

        {/* Empty State */}
        {filteredAndSortedProducts.length === 0 && (
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
