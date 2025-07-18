import React, { useEffect, useState } from "react";
import {
  X,
  Save,
  Package,
  Edit2,
  Tag,
  Hash,
  Search,
  Plus,
  Trash2,
} from "lucide-react";
import "./CollectionModal.css";
import APIs from "../../../../../../services/services/APIs";
import Swal from "sweetalert2";
import useUserStore from "../../../../../../zustand/General";

interface CollectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (collection: Partial<Collection>) => void;
  collection?: Collection | null;
}

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

interface Article {
  id: number;
  nombre: string;
  codigo: string;
  descripcion: string;
  familia?: number;
  [key: string]: any;
}

const CollectionModal: React.FC<CollectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  collection,
}) => {
  const [formData, setFormData] = useState({
    nombre: "",
    familia: 0,
    activo: true,
  });
  const userId = useUserStore((state) => state.user.id);


  // States for artículos section
  const [buscarPor, setBuscarPor] = useState(0);
  const [buscadorText, setBuscadorText] = useState("");
  const [selectedResultado, setSelectedResultado] = useState(0);
  const [selectedArticles, setSelectedArticles] = useState<Article[]>([]);
  const [removedArticles, setRemovedArticles] = useState<number[]>([]); // IDs de artículos eliminados
  const [originalArticles, setOriginalArticles] = useState<number[]>([]); // IDs originales al abrir el modal

  
  // Search states
  const [searchResults, setSearchResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const [families, setFamilies] = useState<Familia[]>([]);

  const buscarPorOptions = [
    { id: 1, nombre: "Código" },
    { id: 2, nombre: "Descripción" },
    { id: 3, nombre: "Familia" },
  ];
  

  const getFamilies = async () => {
    console.log('🔍 Intentando cargar familias, userId:', userId);
    try {
      if (!userId) {
        console.error('❌ userId no está disponible');
        return;
      }
      
      console.log('📡 Llamando API getFamilies con userId:', userId);
      const response: any = await APIs.getFamilies(userId);
      console.log('✅ Respuesta de getFamilies:', response);
      
      const familiesData = response.data || response || [];
      setFamilies(familiesData);
      console.log('📝 Familias establecidas:', familiesData);
    } catch (error) {
      console.error('❌ Error al cargar familias:', error);
      Swal.fire('Error', 'No se pudieron cargar las familias', 'error');
    }
  };

  useEffect(() => {
    console.log('🚀 useEffect ejecutándose, isOpen:', isOpen, 'userId:', userId);
    if (isOpen && userId) {
      getFamilies();
    }
  }, [isOpen, userId]);

  useEffect(() => {
    if (collection) {
      setFormData({
        nombre: collection.nombre,
        familia: collection.id_familia || 0,
        activo: collection.status ?? true,
      });
      
      const articlesData = collection.articulos?.map(art => ({
        id: art.id,
        nombre: art.nombre,
        codigo: art.codigo,
        descripcion: art.nombre,
      })) || [];
      
      setSelectedArticles(articlesData);
      
      // Guardar IDs originales para saber cuáles existían antes
      const originalIds = collection.articulos?.map(art => art.id) || [];
      setOriginalArticles(originalIds);
      console.log('📋 Artículos originales en la colección:', originalIds);
    } else {
      setFormData({
        nombre: "",
        familia: 0,
        activo: true,
      });
      setSelectedArticles([]);
      setOriginalArticles([]); // Limpiar artículos originales
    }
    // Reset search states
    setBuscarPor(0);
    setBuscadorText("");
    setSelectedResultado(0);
    setSearchResults([]);
    setErrors({});
    setRemovedArticles([]); // Limpiar artículos eliminados
  }, [collection, isOpen]);

  const searchArticle = async () => {
    if (!buscadorText.trim()) {
      Swal.fire('Atención', 'Ingrese un término de búsqueda', 'warning');
      return;
    }

    setPage(1);
    setLoading(true);
    
    const data = {
      id: 0,
      activos: true,
      nombre: buscarPor === 2 ? buscadorText : '', // Buscar por descripción
      codigo: buscarPor === 1 ? buscadorText : '', // Buscar por código
      familia: buscarPor === 3 ? parseInt(buscadorText) || 0 : 0, // Buscar por familia
      proveedor: 0,
      materia_prima: 99,
      get_sucursales: false,
      get_proveedores: false,
      get_max_mins: false,
      get_plantilla_data: false,
      get_areas_produccion: false,
      coleccion: false,
      get_stock: false,
      get_web: false,
      get_unidades: false,
      for_vendedor: false,
      get_imagenes: true,
      page: page,
    };
    
    try {
      const result: any = await APIs.getArticles(data);
      const articles = result.data || result || [];
      setSearchResults(articles);
      setLoading(false);
    } catch (error) {
      console.error('Error en búsqueda:', error);
      setLoading(false);
      Swal.fire('Error', 'Error al buscar artículos', 'error');
    }
  };

  const addArticleToCollection = () => {
    const selectedArticle = searchResults.find(article => article.id === selectedResultado);
    
    if (!selectedArticle) {
      Swal.fire('Atención', 'Seleccione un artículo de los resultados', 'warning');
      return;
    }

    // Verificar si el artículo ya está en la colección
    const exists = selectedArticles.some(article => article.id === selectedArticle.id);
    if (exists) {
      Swal.fire('Atención', 'El artículo ya está en la colección', 'warning');
      return;
    }

    setSelectedArticles(prev => [...prev, selectedArticle]);
    setSelectedResultado(0); // Reset selection
    Swal.fire('Éxito', 'Artículo agregado a la colección', 'success');
  };

  const removeArticleFromCollection = (articleId: any) => {
    console.log('🗑️ Artículo a eliminar:', articleId);
    setSelectedArticles(prev => prev.filter(article => article.id !== articleId));
    
    // Si estamos editando una colección existente Y el artículo estaba originalmente
    if (collection && originalArticles.includes(articleId)) {
      setRemovedArticles(prev => {
        if (!prev.includes(articleId)) {
          const newRemoved = [...prev, articleId];
          console.log('🗑️ Artículo ORIGINAL marcado para eliminar:', articleId);
          console.log('🗑️ Lista de eliminados:', newRemoved);
          return newRemoved;
        }
        return prev;
      });
    } else if (collection && !originalArticles.includes(articleId)) {
      console.log('➖ Artículo NUEVO removido (no va a eliminados):', articleId);
    }
    
    Swal.fire('Éxito', 'Artículo removido de la colección', 'success');
  };


  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = "El nombre es requerido";
    }

    if (formData.familia === 0) {
      newErrors.familia = "Debe seleccionar una familia";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const updateColeccion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Crear array de IDs puros
    const articulosLimpios = [];
    for (let i = 0; i < selectedArticles.length; i++) {
      const article = selectedArticles[i];
      articulosLimpios.push(article.id);
    }

    const coleccion = {
      id: collection?.id || 0,
      nombre: formData.nombre,
      id_familia: Number(formData.familia),
      id_empresa: 0,
      tipo: 2,
      id_sucursal: 0,
      empresa: {
        id: 0,
        razon_social: ''
      },
      sucursal: {
        id: 0,
        nombre: ''
      },
      img: '',
      status: true,
      colecciones_art: articulosLimpios,
      colecciones_suc: [],
      colecciones_art_piv: [],
      colecciones_suc_piv: [],
      articulos_remove: removedArticles, // IDs de artículos eliminados
      sucursales_remove: []
    };

    console.log('🔄 ACTUALIZANDO colección:', coleccion);
    console.log('📋 Artículos originales:', originalArticles);
    console.log('📋 Artículos actuales:', articulosLimpios);
    console.log('🗑️ Artículos a eliminar:', removedArticles);
    console.log('➕ Artículos nuevos:', articulosLimpios.filter(id => !originalArticles.includes(id)));
    console.log('🔍 Tipo de removedArticles:', typeof removedArticles);
    console.log('🔍 Longitud de removedArticles:', removedArticles.length);
    
    await APIs.CreateAnyPut(coleccion, "update_coleccion/update")
    .then(async (response: any) => {
        Swal.fire('Notificación', response.mensaje, 'success');
        onSave(coleccion);
        onClose();
    })
    .catch((error: any) => {
        console.error('❌ Error actualizando:', error);
        if (error.response) {
            if (error.response.status === 409) {
                Swal.fire(error.mensaje, '', 'warning');
            } else {
                Swal.fire('Error al actualizar la colección', '', 'error');
            }
        } else {
            Swal.fire('Error de conexión.', '', 'error');
        }
    })
  };

  const createColeccion = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Crear array de IDs puros
    const articulosLimpios = [];
    for (let i = 0; i < selectedArticles.length; i++) {
      const article = selectedArticles[i];
      articulosLimpios.push(article.id);
    }

    const coleccion = {
      id: 0,
      nombre: formData.nombre,
      id_familia: Number(formData.familia),
      id_empresa: 0,
      tipo: 2,
      id_sucursal: 0,
      empresa: {
        id: 0,
        razon_social: ''
      },
      sucursal: {
        id: 0,
        nombre: ''
      },
      img: '',
      status: true,
      colecciones_art: articulosLimpios,
      colecciones_suc: [],
      colecciones_art_piv: [],
      colecciones_suc_piv: [],
      articulos_remove: [],
      sucursales_remove: []
    };

    console.log('➕ CREANDO nueva colección:', coleccion);
    
    await APIs.CreateAny(coleccion, "create_coleccion/create")
    .then(async (response: any) => {
        Swal.fire('Notificación', response.mensaje, 'success');
        onSave(coleccion);
        onClose();
    })
    .catch((error: any) => {
        console.error('❌ Error creando:', error);
        if (error.response) {
            if (error.response.status === 409) {
                Swal.fire(error.mensaje, '', 'warning');
            } else {
                Swal.fire('Error al crear la colección', '', 'error');
            }
        } else {
            Swal.fire('Error de conexión.', '', 'error');
        }
    })
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (collection) {
      await updateColeccion(e);
    } else {
      await createColeccion(e);
    }
  };



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-container">
            <div className="modal-icon">
              {collection ? (
                <Edit2 className="icon-lg" />
              ) : (
                <Package className="icon-lg" />
              )}
            </div>
            <h2 className="modal-title">
              {collection ? "Editar Colección" : "Crear Colección"}
            </h2>
          </div>
          <button className="modal-close" onClick={onClose}>
            <X className="icon-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nombre">
                <Hash className="icon-sm" />
                Nombre <span className="required">*</span>
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={formData.nombre}
                onChange={handleInputChange}
                className={errors.nombre ? "error" : ""}
                placeholder="Ej: USB-S"
              />
              {errors.nombre && (
                <span className="error-message">{errors.nombre}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="familia">
                <Tag className="icon-sm" />
                Familia <span className="required">*</span>
              </label>
              <select
                id="familia"
                name="familia"
                value={formData.familia}
                onChange={handleInputChange}
                className={errors.familia ? "error" : ""}
              >
                <option value={0}>Seleccionar familia</option>
                {families.map((familia) => (
                  <option key={familia.id} value={familia.id}>
                    {familia.nombre}
                  </option>
                ))}
              </select>
              {errors.familia && (
                <span className="error-message">{errors.familia}</span>
              )}
            </div>

            {/* <div className="form-group checkbox-group">
              <label className="checkbox-label">
                <input
                  name="activo"
                  type="checkbox"
                  checked={formData.activo}
                  onChange={handleInputChange}
                />
                <CheckCircle className="icon-sm" />
                <span className="checkbox-text">Colección activa</span>
              </label>
            </div> */}
          </div>

          {/* AGREGAR ARTÍCULOS Section */}
          <div className="articulos-section-main">
            <h3 className="section-title">ARTÍCULOS</h3>

            <div className="articulos-container">
              <div className="articulos-form">
                <div className="form-group">
                  <label>Buscar por</label>
                  <select
                    value={buscarPor}
                    onChange={(e) => setBuscarPor(Number(e.target.value))}
                  >
                    <option value={0}>selecciona</option>
                    {buscarPorOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.nombre}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Buscador</label>
                  <div className="input-with-button">
                    <input
                      type="text"
                      value={buscadorText}
                      onChange={(e) => setBuscadorText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          searchArticle();
                        }
                      }}
                      placeholder="Ingresa el nombre y presiona Enter"
                      className="input-search"
                    />
                    <button 
                      type="button" 
                      className="btn-secondary btn-inline"
                      onClick={searchArticle}
                      disabled={loading}
                    >
                      <Search className="icon-sm" />
                      {loading ? 'Buscando...' : 'Buscar'}
                    </button>
                  </div>
                </div>
                
                <div className="form-group">
                  <label>Resultados</label>
                  <div className="input-with-button">
                    <select
                      value={selectedResultado}
                      onChange={(e) =>
                        setSelectedResultado(Number(e.target.value))
                      }
                      className="select-search"
                    >
                      <option value={0}>Selecciona un resultado</option>
                      {searchResults.map((resultado: Article) => (
                        <option key={resultado.id} value={resultado.id}>
                          {resultado.nombre}
                        </option>
                      ))}
                    </select>
                    <button 
                      type="button" 
                      className="btn-primary btn-inline"
                      onClick={addArticleToCollection}
                      disabled={selectedResultado === 0}
                    >
                      <Plus className="icon-sm" />
                      Agregar
                    </button>
                  </div>
                </div>
              </div>

              <div className="list-container">
                <div className="list-header">
                  <h5>Artículo</h5>
                </div>
                <div className="list-content">
                  {selectedArticles.length === 0 ? (
                    <p className="empty-message">No hay artículos en la colección</p>
                  ) : (
                    selectedArticles.map((articulo: Article, index) => (
                      <div key={index} className="list-item">
                        <span>{articulo.nombre}</span>
                        <button
                          type="button"
                          className="btn-icon-only"
                          onClick={() => removeArticleFromCollection(articulo.id)}
                        >
                          <Trash2 className="icon-sm" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-outline" onClick={onClose}>
              <X className="icon-sm" />
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              <Save className="icon-sm" />
              {collection ? "Actualizar" : "Crear"} Colección
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionModal;
