import React, { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  ChevronDown,
  Tag,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./Collections.css";
import CollectionModal from "./collections-modal/CollectionModal";
import APIs from "../../../../../services/services/APIs";
import useUserStore from "../../../../../zustand/General";

interface Collection {
  id: number;
  nombre: string;
  id_familia?: number;
  status: boolean;
  articulos?: Array<{
    id: number;
    id_articulo: number;
    codigo: string;
    nombre: string;
  }>;
  sucursales?: Array<{
    id: number;
    id_sucursal: number;
    nombre_sucursal: string;
    razon_social: string;
  }>;
}

interface Familia {
  id: number;
  nombre: string;
}

const Collections: React.FC = () => {
  const userId = useUserStore((state) => state.user.id);

  // Form states
  const [nombre, setNombre] = useState("");
  const [debouncedNombre, setDebouncedNombre] = useState("");
  const [selectedFamilie, setSelectedFamilie] = useState<number | null>(null);
  const [selectFamilies, setSelectFamilies] = useState(false);
  const [typeActive, setTypeActive] = useState(1);
  const [page, setPage] = useState(1);
  
  // Pagination states
  const itemsPerPage = 10;
  const [totalPages, setTotalPages] = useState(1);
  const [totalFilteredItems, setTotalFilteredItems] = useState(0);

  // Data states
  const [collections, setCollections] = useState<Collection[]>([]);
  const [families, setFamilies] = useState<Familia[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null,
  );

  // Función para cargar familias desde la API
  const loadFamilies = async () => {
    try {
      console.log('📋 Cargando familias con userId:', userId);
      if (!userId) {
        console.warn('⚠️ userId no disponible para cargar familias');
        return;
      }
      const response: any = await APIs.getFamilies(userId);
      const familiesData = response.data || response || [];
      setFamilies(familiesData);
      console.log('✅ Familias cargadas:', familiesData);
    } catch (error) {
      console.error('❌ Error cargando familias:', error);
      // Fallback a familias mock si la API falla
      const mockFamilies: Familia[] = [
        { id: 1, nombre: "Electrónicos" },
        { id: 2, nombre: "Ropa" },
        { id: 3, nombre: "Hogar" },
        { id: 4, nombre: "Deportes" },
      ];
      setFamilies(mockFamilies);
    }
  };

 
  const [collection, setCollection] = useState<any[]>([]);
  const getData = async () => {
    try {
      const result: any = await APIs.GetAny("get_coleccion/get")
      console.log('API result:', result)
      setCollection(result || [])
    } catch (error) {
      console.error('Error fetching collections:', error)
      setCollection([])
    }
  }

useEffect(() => {
  getData();
  if (userId) {
    loadFamilies();
  }
}, [userId])

// Función de búsqueda local (fuerza la búsqueda inmediata)
const performSearch = () => {
  console.log('🔍 Iniciando búsqueda local forzada con filtros:');
  console.log('- Nombre:', nombre);
  console.log('- Familia:', selectedFamilie);
  console.log('- Estado activo:', typeActive);
  
  setDebouncedNombre(nombre); // Forzar búsqueda inmediata sin esperar debounce
  setPage(1); // Resetear a página 1 cuando se busca
};

// useEffect para debounce del nombre (esperar 300ms después de que el usuario deje de escribir)
useEffect(() => {
  const timer = setTimeout(() => {
    setDebouncedNombre(nombre);
  }, 300);

  return () => clearTimeout(timer);
}, [nombre]);

// useEffect para filtros en tiempo real
useEffect(() => {
  if (collection.length >= 0) {
    loadCollections();
  }
}, [collection, debouncedNombre, selectedFamilie, typeActive, page])

// useEffect adicional para resetear página cuando cambian los filtros (excepto página)
useEffect(() => {
  if (page !== 1) {
    setPage(1);
  }
}, [debouncedNombre, selectedFamilie, typeActive])

  const loadCollections = () => {
    setLoading(true);
    try {
      console.log('📊 Filtrando colecciones localmente');
      console.log('- Datos originales:', collection.length, 'colecciones');
      
      let filteredCollections = [...collection];

      // Aplicar filtros
      console.log('🔍 Aplicando filtro de nombre:', `"${debouncedNombre}"`);
      if (debouncedNombre.trim()) {
        const searchTerm = debouncedNombre.toLowerCase().trim();
        console.log('- Término de búsqueda procesado:', `"${searchTerm}"`);
        
        filteredCollections = filteredCollections.filter((coll) => {
          const collectionName = (coll.nombre || '').toLowerCase();
          const matches = collectionName.includes(searchTerm);
          if (!matches) {
            console.log(`- "${coll.nombre}" NO coincide con "${searchTerm}"`);
          }
          return matches;
        });
        
        console.log('- Después del filtro de nombre:', filteredCollections.length);
        console.log('- Colecciones que coinciden:', filteredCollections.map(c => c.nombre));
      } else {
        console.log('- Sin filtro de nombre (campo vacío)');
      }

      if (selectedFamilie && selectedFamilie !== 0) {
        filteredCollections = filteredCollections.filter(
          (coll) => coll.id_familia === selectedFamilie,
        );
        console.log('- Después del filtro de familia:', filteredCollections.length);
      }

      if (typeActive === 1) {
        filteredCollections = filteredCollections.filter(
          (coll) => coll.status,
        );
        console.log('- Después del filtro activos:', filteredCollections.length);
      } else if (typeActive === 0) {
        filteredCollections = filteredCollections.filter(
          (coll) => !coll.status,
        );
        console.log('- Después del filtro inactivos:', filteredCollections.length);
      }

      // Calcular paginación
      const totalItems = filteredCollections.length;
      const calculatedTotalPages = Math.ceil(totalItems / itemsPerPage);
      setTotalPages(calculatedTotalPages);
      setTotalFilteredItems(totalItems);

      // Aplicar paginación (obtener solo los elementos de la página actual)
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedCollections = filteredCollections.slice(startIndex, endIndex);

      console.log('📄 Paginación aplicada:');
      console.log('- Total elementos filtrados:', totalItems);
      console.log('- Página actual:', page);
      console.log('- Elementos por página:', itemsPerPage);
      console.log('- Total páginas:', calculatedTotalPages);
      console.log('- Elementos en esta página:', paginatedCollections.length);

      setCollections(paginatedCollections);
      setLoading(false);
    } catch (error) {
      console.error('❌ Error filtrando colecciones:', error);
      setLoading(false);
    }
  };



  const handleFamiliesChange = (
    familia: Familia | { id: number; nombre: string },
  ) => {
    setSelectedFamilie(familia.id);
    setSelectFamilies(false);
  };

  const handleActivesCollectionChange = (value: number) => {
    setTypeActive(value);
  };

  const searchCollection = () => {
    performSearch();
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      searchCollection();
    }
  };

  // Función para limpiar todos los filtros
  const clearFilters = () => {
    console.log('🧹 Limpiando todos los filtros');
    setNombre("");
    setDebouncedNombre(""); // Limpiar también el debounced
    setSelectedFamilie(null);
    setTypeActive(1);
    setPage(1);
    // loadCollections se ejecutará automáticamente por el useEffect
  };

  const editCollection = (collection: Collection) => {
    setEditingCollection(collection);
    setShowModal(true);
  };

  const createNewCollection = () => {
    setEditingCollection(null);
    setShowModal(true);
  };

  const handleSaveCollection = async (_: Partial<Collection>) => {
    // Refresh data from API after save
    await getData();
    loadCollections();
    setShowModal(false);
    setEditingCollection(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCollection(null);
  };

  const selectedFamilyName = selectedFamilie
    ? families.find((f) => f.id === selectedFamilie)?.nombre || "Todos"
    : "Todos";

  console.log('collecollectioncollectioncollectionction', collection)

  return (
    <div className="collections">
      <div className="container__collections">
    
        {/* Search and filters */}
        <div className="row__one">
          <div className="form-group">
            <label htmlFor="nombre">
              <BarChart3 className="icon-sm" />
              Nombre
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                onKeyUp={handleKeyPress}
                placeholder="Ingresa el nombre (filtro automático)"
              />
              {nombre !== debouncedNombre && (
                <small style={{ 
                  position: 'absolute', 
                  right: '8px', 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  color: '#666',
                  fontSize: '11px'
                }}>
                  ⏳
                </small>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>
              <Tag className="icon-sm" />
              Familias
            </label>
            <div className="select-container">
              <div
                className="select-trigger"
                onClick={() => setSelectFamilies(!selectFamilies)}
              >
                <span>{selectedFamilyName}</span>
                <ChevronDown className="icon-sm" />
              </div>
              {selectFamilies && (
                <div className="select-dropdown">
                  <div
                    className="select-option"
                    onClick={() =>
                      handleFamiliesChange({ id: 0, nombre: "Todos" })
                    }
                  >
                    Todos
                  </div>
                  {families.length > 0 ? (
                    families.map((familia) => (
                      <div
                        key={familia.id}
                        className="select-option"
                        onClick={() => handleFamiliesChange(familia)}
                      >
                        {familia.nombre}
                      </div>
                    ))
                  ) : (
                    <div className="select-option disabled">
                      Cargando familias...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Estado</label>
            <div className="radio-group">
              <label className="radio-item">
                <input
                  type="radio"
                  name="estado"
                  checked={typeActive === 1}
                  onChange={() => handleActivesCollectionChange(1)}
                />
                <span>Activos</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="estado"
                  checked={typeActive === 0}
                  onChange={() => handleActivesCollectionChange(0)}
                />
                <span>Inactivos</span>
              </label>
            </div>
          </div>

          <div className="form-group actions-group">
            <label>Acciones</label>
            <div className="action-buttons">
              <button 
                className="btn-primary" 
                onClick={searchCollection}
                disabled={loading}
              >
                <Search className="icon-sm" />
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
              <button 
                className="btn-outline" 
                onClick={clearFilters}
                disabled={loading}
              >
                Limpiar
              </button>
              <button className="btn-success" onClick={createNewCollection}>
                <Plus className="icon-sm" />
                Crear Colección
              </button>
            </div>
          </div>
        </div>

        {/* Info section */}
        <div className="row__three">
          <div className="collections-info">
            {loading ? (
              <span>🔍 Filtrando colecciones...</span>
            ) : nombre !== debouncedNombre ? (
              <span>⏳ Procesando filtro de nombre...</span>
            ) : collections.length > 0 ? (
              <span>
                📊 Mostrando {collections.length} de {totalFilteredItems} colecciones 
                | Página {page} de {totalPages}
              </span>
            ) : (
              <span>📭 No se encontraron colecciones{debouncedNombre ? ` con "${debouncedNombre}"` : ''}</span>
            )}
          </div>
        </div>

        {/* Collections table */}
        <div className="table__collections">
          <div className="table__head">
            <div className="thead">
              <div>Nombre</div>
              <div>Estado</div>
              <div>Acciones</div>
            </div>
          </div>

          <div className="table__body">
            {loading ? (
              <div className="loading_modal">
                <div className="text_collection_loading">Cargando datos...</div>
              </div>
            ) : collections.length > 0 ? (
              collections.map((collection) => (
                <div key={collection.id} className="tbody__container">
                  <div className="tbody">
                    <div>{collection.nombre}</div>
                    <div>
                      <span
                        className={`status-badge ${collection.status ? "active" : "inactive"}`}
                      >
                        {collection.status ? "ACTIVO" : "INACTIVO"}
                      </span>
                    </div>
                    <div>
                      <button
                        className="edit-btn"
                        onClick={() => editCollection(collection)}
                      >
                        <Edit2 className="icon-sm" />
                        Editar
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="loading_modal">
                <div className="text_collection_loading">
                  No se encontraron colecciones
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn-outline"
                onClick={() => setPage(page - 1)}
                disabled={page === 1 || loading}
              >
                <ChevronLeft className="icon-sm" />
                Anterior
              </button>
              
              <div className="page-info">
                <span>Página {page} de {totalPages}</span>
                <small style={{ display: 'block', fontSize: '0.75rem', color: '#666' }}>
                  {itemsPerPage} elementos por página
                </small>
              </div>
              
              <button 
                className="btn-outline" 
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages || loading}
              >
                Siguiente
                <ChevronRight className="icon-sm" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Collection Modal */}
      <CollectionModal
        isOpen={showModal}
        onClose={handleCloseModal}
        onSave={handleSaveCollection}
        collection={editingCollection}
      />
    </div>
  );
};

export default Collections;
