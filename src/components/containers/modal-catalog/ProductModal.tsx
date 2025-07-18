import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import "./ProductModal.css";
import APIs from "../../../services/services/APIs";
import useUserStore from "../../../zustand/General";
import axios from "axios";
import Swal from "sweetalert2";

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

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  url_img: string;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  
}) => {
  const [article, setArticle] = useState<any>(null);
  const [imgs, setImgs] = useState<any[]>([]);

  const [modalLoading, setModalLoading] = useState(true);

  const [opciones, setOpciones] = useState<any[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  const userState = useUserStore((state) => state.user);
  const url = useUserStore((state) => state.url_img);

  const user_id = userState?.id;

  const fetchArticleData = async () => {
    if (!product) return;

    // Iniciar loading inmediatamente
    setModalLoading(true);
    setArticle(null); // Limpiar datos anteriores

    try {
      await APIs.GetAny('get_permisos_x_vista/' + user_id + '/FICHA');
 
    } catch (error) {
      console.error('Error fetching permisos:', error);
    }

    const data = {
      id: product.id,
      activos: true,
      nombre: '',
      codigo: '',
      familia: 0,
      proveedor: 0,
      materia_prima: 0,
      get_sucursales: false,
      get_imagenes: true,
      get_proveedores: false,
      get_max_mins: false,
      get_precios: (userState as any)?.franquicia == true ? true : false,
      get_combinaciones: true,
      get_plantilla_data: true,
      get_areas_produccion: true,
      get_tiempos_entrega: false,
      get_componentes: false,
      get_stock: false,
      get_web: false,
      for_ventas: true,
      get_unidades: true,
      id_usuario: user_id,
      id_grupo_us: false
    };

    try {
      const response: any = await axios.post(
        "http://hiplot.dyndns.org:84/cotizador_api/index.php/mantenimiento/get_articulos",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response || response.data.length === 0) {
        throw new Error('No se encontraron artículos');
      }

      const art = response.data[0];
      console.log('Artículo cargado:', art);

      let plantillaData = art.plantilla_data || [];
      plantillaData = plantillaData.map((item: any) => ({
        ...item,
        id_plantillas_art_campos: item.id,
      }));

      const articleData = { ...art, plantilla_data: plantillaData };
      setArticle(articleData);
      setModalLoading(false);
      console.log('✅ Artículo cargado exitosamente:', articleData);

      // Configurar combinaciones
      if (art.opciones_de_variacion2 && art.opciones_de_variacion2.length > 0) {
        const combinacionesConfiguradas = art.opciones_de_variacion2.map((combinacion: any) => ({
          combinacion: combinacion.combinacion,
          OpcionSelected: "",
          opciones: combinacion.opciones || []
        }));
        setOpciones(combinacionesConfiguradas);
        console.log('Combinaciones configuradas:', combinacionesConfiguradas);
      }

      // Mostrar notificaciones
      if (art.bajo_pedido) await Swal.fire('Notificación', 'Este articulo es BAJO PEDIDO, la orden de venta creada se pondrá en status PENDIENTE, hasta la llegada del material faltante', 'warning');
      if (art.desabasto) await Swal.fire('Notificación', 'Hay desabasto de este articulo...', 'warning');
      if (art.precio_libre) await Swal.fire('Notificación', 'El precio arrojado por este articulo es una SUGERENCIA DE VENTA, realiza la confirmación con tu superior de este precio, verifica tu lista de precios o consulta con a.', 'success');
      if (art.ultimas_piezas) await Swal.fire('Notificación', 'El stock disponible son las ULTIMAS PIEZAS...', 'warning');
      if (art.consultar_te) await Swal.fire('Notificación', 'Consulta el Tiempo de Entrega de este articulo con el area de producción correspondiente', 'warning');
      if (art.consultar_cotizador) await Swal.fire('Notificación', 'Este articulo debe consultar el precio con cotizador', 'warning');

      // Cargar imágenes
      try {
        const imgResponse: any = await APIs.GetAny('articulo_imagenes_get/' + art.id);
        console.log('Imágenes cargadas:', imgResponse);
        setImgs(imgResponse || []);
      } catch (error) {
        console.error('Error cargando imágenes:', error);
        setImgs([]);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setModalLoading(false);
    }
  };

  const toggleModal = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleSelect = (combinacionIndex: number, optionId: number) => {
    setOpciones(prev => prev.map((combinacion, index) => {
      if (index === combinacionIndex) {
        const updatedOpciones = combinacion.opciones.map((option: any) => ({
          ...option,
          selected: option.id === optionId
        }));
        
        const selectedOption = updatedOpciones.find((opt: any) => opt.id === optionId);
        
        return {
          ...combinacion,
          opciones: updatedOpciones,
          OpcionSelected: selectedOption ? selectedOption.nombre : ""
        };
      }
      return combinacion;
    }));
    
    // Cerrar automáticamente las opciones después de seleccionar
    setActiveIndex(null);
  };

  const fetch2 = async (selectedIds: any[]) => {
    const data = {
      id: 0,
      activos: true,
      nombre: '',
      codigo: '',
      familia: 0,
      proveedor: 0,
      materia_prima: 0,
      get_sucursales: false,
      get_imagenes: false,
      get_proveedores: false,
      get_max_mins: false,
      get_precios: false,
      get_combinaciones: true,
      get_plantilla_data: true,
      get_areas_produccion: true,
      get_tiempos_entrega: false,
      get_componentes: false,
      get_stock: false,
      get_web: false,
      for_ventas: true,
      get_unidades: true,
      id_usuario: user_id,
      por_combinacion: true,
      opciones: selectedIds,
      id_articulo_variacion: article.id
    };

    try {
      setModalLoading(true);
      let resp: any = await axios.post(
        "http://hiplot.dyndns.org:84/cotizador_api/index.php/mantenimiento/get_articulos",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
      const response = resp.data;
      
      if (response && response.length > 0) {
        const newArticle = response[0];
        console.log('Nuevo artículo encontrado:', newArticle);
        
        // Actualizar el artículo con la nueva información
        setArticle(newArticle);
        
        // Actualizar el artículo con la nueva información
        setArticle(newArticle);
        
        // Notificar al componente padre sobre el cambio
        // Aquí podrías agregar una prop onProductChange si necesitas actualizar el catálogo
        
        // Mostrar notificación de éxito
        Swal.fire('Éxito', 'Artículo encontrado con las combinaciones seleccionadas', 'success');
      } else {
        Swal.fire('No encontrado', 'No se encontró un artículo con las combinaciones seleccionadas', 'warning');
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire('Error', 'Error al buscar el artículo con las combinaciones seleccionadas', 'error');
    } finally {
      setModalLoading(false);
    }
  };

  // Verificar si todas las combinaciones tienen una opción seleccionada
  const areAllCombinationsSelected = () => {
    return opciones.every((combinacion: any) => 
      combinacion.OpcionSelected && combinacion.OpcionSelected !== ""
    );
  };

  // Obtener los IDs de las opciones seleccionadas
  const getSelectedIds = () => {
    const selectedIds: any[] = [];
    opciones.forEach((combinacion: any) => {
      const selectedOption = combinacion.opciones.find((option: any) => option.selected);
      if (selectedOption) {
        selectedIds.push(selectedOption.id);
      }
    });
    return selectedIds;
  };

  const BuscarArticuloPorCombinacion = async () => {
    if (!areAllCombinationsSelected()) {
      Swal.fire('Atención', 'Debes seleccionar una opción de cada combinación', 'warning');
      return;
    }

    const selectedIds = getSelectedIds();
    console.log('IDs seleccionados:', selectedIds);
    
    await fetch2(selectedIds);
  };

  useEffect(() => {
    if (isOpen && product) {
      setModalLoading(true);
      setArticle(null);
      setCurrentImageIndex(0);
      fetchArticleData();
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;
















  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="product-modal-header">
          <h2 className="product-modal-title">Detalles del Producto</h2>
          <button className="product-modal-close" onClick={onClose}>
            <X className="icon-lg" />
          </button>
        </div>

        <div className="product-modal-body">
          {modalLoading ? (
            <div className="full-loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando información del producto...</p>
            </div>
          ) : article ? (
            <>
              <div className="product-modal-image-section">
                <div className="product-modal-image-container">
                  {article.destacado && (
                    <div className="featured-badge">Destacado</div>
                  )}
                  
                  {/* Imagen principal */}
                  <img
                    src={`${url}${imgs.length > 0 ? imgs[currentImageIndex]?.img_url : article.imagen}`}
                    alt={article.nombre}
                    className="product-modal-image"
                    onError={(e) => {
                      console.log('Error cargando imagen:', e.currentTarget.src);
                      // Fallback a imagen por defecto si falla
                      e.currentTarget.src = `${url}${article.imagen}`;
                    }}
                  />

                  {/* Controles del carrusel si hay múltiples imágenes */}
                  {imgs.length > 1 && (
                    <>
                      <button 
                        className="carousel-btn prev"
                        onClick={() => setCurrentImageIndex(prev => prev === 0 ? imgs.length - 1 : prev - 1)}
                      >
                        ‹
                      </button>
                      <button 
                        className="carousel-btn next"
                        onClick={() => setCurrentImageIndex(prev => prev === imgs.length - 1 ? 0 : prev + 1)}
                      >
                        ›
                      </button>
                      
                      {/* Indicadores de imagen */}
                      <div className="image-indicators">
                        {imgs.map((_, index) => (
                          <button
                            key={index}
                            className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                            onClick={() => setCurrentImageIndex(index)}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="product-modal-info-section">
                <div className="product-header">
                  <div className="product-code">
                    CÓDIGO: {article.codigo}
                  </div>
                  <h3 className="product-name">{article.nombre}</h3>
                </div>
                
                <div className="product-description">
                  <p>{article.descripcion}</p>
                </div>

                <div className="product-details">
                  {article.precio && (
                    <div className="detail-item price">
                      <span className="detail-label">Precio</span>
                      <span className="detail-value price-value">${article.precio.toFixed(2)}</span>
                    </div>
                  )}

                  {article.familia && (
                    <div className="detail-item">
                      <span className="detail-label">Familia</span>
                      <span className="detail-value">{article.familia}</span>
                    </div>
                  )}

                  {article.coleccion && (
                    <div className="detail-item">
                      <span className="detail-label">Colección</span>
                      <span className="detail-value">{article.coleccion}</span>
                    </div>
                  )}
                </div>



                {/* Combinaciones */}
                {opciones && opciones.length > 0 && (
              <div className="combinaciones">
                <h4>Combinaciones Disponibles</h4>
                {opciones.map((x: any, index: any) => (
                  <div className='combinaciones__container' key={index}>
                    <div 
                      className={`container__combination ${x.OpcionSelected && x.OpcionSelected !== "" ? 'selected' : ''}`}
                      onClick={() => toggleModal(index)}
                    >
                      <span>{x.OpcionSelected && x.OpcionSelected !== "" ? x.OpcionSelected : x.combinacion}</span>
                      {/* <span className="combination-arrow">▼</span> */}
                    </div>
                    {activeIndex === index && (
                      <div className="combination_options">
                        <div className="options-grid">
                          {x.opciones.map((option: any) => (
                            <div 
                              key={option.id} 
                              className={`option-item ${option.selected ? 'selected' : ''}`}
                              onClick={() => handleSelect(index, option.id)}
                            >
                              {option.tipo === "2" ? (
                                <div className='color-option'>
                                  <div className='tooltip-container'>
                                    <div
                                      className="color-swatch"
                                      style={{
                                        backgroundColor: option.color,
                                      }}
                                    />
                                    <span className="tooltip-text">{option.nombre}</span>
                                  </div>
                                </div>
                              ) : (
                                <span className="option-text">{option.nombre}</span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {opciones.length > 1 && (
                  <div 
                    className={`search__sale-card ${!areAllCombinationsSelected() ? 'disabled' : ''}`} 
                    onClick={areAllCombinationsSelected() ? BuscarArticuloPorCombinacion : undefined}
                    style={{
                      opacity: areAllCombinationsSelected() ? 1 : 0.5,
                      cursor: areAllCombinationsSelected() ? 'pointer' : 'not-allowed'
                    }}
                  >
                    {modalLoading ? (
                      <>
                        <div className="loading-spinner"></div>
                        Cargando combinaciones...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                          <path d="M21 21l-6 -6" />
                        </svg>
                        Buscar por Combinación
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
              </div>
            </>
          ) : (
            <div className="full-error-container">
              <p>No se pudo cargar la información del producto</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 