import ConfigurationAPIs from '../api/ConfigurationAPIs';

const APIs = {


  // Editor de pagina web
  login: async (email: string, password: string, customPath?: string) => {
    const path = customPath || 'usuario_login';
    return ConfigurationAPIs.post(path, { email, password });
  },

  createArticles: async (data: any, customPath?: string) => {
    const path = customPath || 'articulo_create';
    return ConfigurationAPIs.post(path, data)
  },

  getWebPage: async (id: number, customPath?: string) => {
    const path = customPath || `pagina_cliente/get/${id}`;
    return ConfigurationAPIs.get(path)
  },

  getHeaderAndFooter: async (id_sucursal: number, customPath?: string) => {
    const path = customPath || `pagina_cliente/getHeaderyFooter/${id_sucursal}`;
    return ConfigurationAPIs.get(path)
  },

  createContenedor: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/addContenedor';
    return ConfigurationAPIs.post(path, data)
  },

  updateContenedor: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/updatePaginaContenedor';
    return ConfigurationAPIs.post(path, data)
  },

  deleteContenedor: async (id: string, customPath?: string) => {
    const path = customPath || `pagina_cliente/removeContenedor?id=${id}`;
    return ConfigurationAPIs.post(path, id)
  },

  getContenedor: async (id_seccion: number, customPath?: string) => {
    const path = customPath || `pagina_cliente/getContenedor/${id_seccion}`;
    return ConfigurationAPIs.get(path)
  },

  updateContenedorOrder: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/updateContenedorOrden';
    return ConfigurationAPIs.post(path, data)
  },


  getSectionsWeb: async (id_sucursal: number, customPath?: string) => {
    const path = customPath || `pagina_cliente/getsecciones/${id_sucursal}`;
    return ConfigurationAPIs.get(path)
  },


  createSectionsWeb: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/addSeccion';
    return ConfigurationAPIs.post(path, data)
  },

  deleteSectionsWeb: async (id: number, customPath?: string) => {
    const path = customPath || `pagina_cliente/removeSeccion?id=${id}`;
    return ConfigurationAPIs.post(path, id)
  },



  updateWeb: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/updatePagina';
    return ConfigurationAPIs.post(path, data)
  },


  updateSectionWeb: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/updatePaginaSeccion';
    return ConfigurationAPIs.post(path, data)
  },

  createCategoryWeb: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/addCategoria';
    return ConfigurationAPIs.post(path, data)
  },

  updateCategoryWeb: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/updatePaginaCategoria';
    return ConfigurationAPIs.post(path, data)
  },

  deleteCategoryWeb: async (id: number, customPath?: string) => {
    const path = customPath || `pagina_cliente/removeCategoria?id=${id}`;
    return ConfigurationAPIs.post(path, id)
  },





  createProductsWeb: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/addProducto';
    return ConfigurationAPIs.post(path, data)
  },

  updateProductsWeb: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/updatePaginaProductos';
    return ConfigurationAPIs.post(path, data)
  },

  deleteProductsWeb: async (id: number, customPath?: string) => {
    const path = customPath || `pagina_cliente/removeProducto?id=/${id}`;
    return ConfigurationAPIs.post(path, id)
  },

  updateFooterWeb: async (data: any, customPath?: string) => {
    const path = customPath || 'pagina_cliente/updatePaginaFooter';
    return ConfigurationAPIs.post(path, data)
  },

  getArticles: async (data: any, customPath?: string) => {
    const path = customPath || 'articulos_get';
    return ConfigurationAPIs.post(path, data)
  },

  getArticlesGlobal: async (data: any, customPath?: string) => {
    const path = customPath || 'articulos_get';
    return ConfigurationAPIs.post(path, data)
  },



  getCollectionByFamily: async (familyId: number, customPath?: string) => {
    const path = customPath || `get_colecciones_x_familia/${familyId}`;
    return ConfigurationAPIs.get(path)
  },

  updateArticles: async (data: any) => {
    const path = `update_articulo/${data.id}`;
    return ConfigurationAPIs.put(path, data)
  },



  getArticlesForVendedor: async (data: any, customPath?: string) => {
    const path = customPath || 'articulos_get_for_vendedor';
    return ConfigurationAPIs.post(path, data)
  },

  getFamilies: async (id: number, customPath?: string) => {
    const path = customPath || `familia_get/${id}`
    return ConfigurationAPIs.get(path)
  },

  ////////////////////////////////GRAL ///////////////////////////////////////
  CreateAny: async (data: any, ruta: string) => {
    const path = ruta;
    return ConfigurationAPIs.post(path, data)
  },
  CreateAnyPut: async (data: any, ruta: string) => {
    const path = ruta;
    return ConfigurationAPIs.put(path, data)
  },
  GetAny: async (ruta: string) => {
    const path = ruta;
    return ConfigurationAPIs.get(path)
  },
  deleteAny: async (ruta: string) => {
    const path = ruta;
    return ConfigurationAPIs.delete(path)
  },
  getTotalPriceWSignal: async (dataArticle: any, options: { signal?: AbortSignal } = {}) => {
    const response = await fetch("http://hiplot.dyndns.org:84/api_dev/get_total", {
      method: "POST",
      body: JSON.stringify(dataArticle),
      headers: { "Content-Type": "application/json" },
      signal: options.signal, // Pasa la señal al request
    });

    return response.json();
  },
  getArticleWSignal: async (dataArticle: any, options: { signal?: AbortSignal } = {}) => {
    const response = await fetch("http://hiplot.dyndns.org:84/api_dev/articulos_get", {
      method: "POST",
      body: JSON.stringify(dataArticle),
      headers: { "Content-Type": "application/json" },
      signal: options.signal, // Pasa la señal al request
    });

    return response.json();
  },







  /////////////////////////////////////////////////////// Colleciones ////////////////////////////////////////////////////////////////////////
}




export default APIs;



