import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Plus,
  Edit2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./styles/Article.css";
import ArticleModal from "./article-modal/ArticleModal";
import APIs from "../../../../../services/services/APIs";
import { storeArticles } from "../../../../../zustand/Articles";

interface Article {
  id: number;
  codigo: string;
  descripcion: string;
  familia?: number;
  activo: boolean;
}

interface Familia {
  id: number;
  nombre: string;
}


const Articles: React.FC = () => {
  const effectRan = useRef(false);
  const [page, setPage] = useState<any>(1);
  const [typeModal, setTypeModal] = useState<string>('')
 

  // Form states
  const [code, setCode] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [selectedFamilie, setSelectedFamilie] = useState<number | null>(null);
  const [selectFamilies, setSelectFamilies] = useState(false);


  // Data states
  const {articles}: any = storeArticles();

    const setArticles: any = storeArticles((state) => state.setArticles);
  const [families, setFamilies] = useState<Familia[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);

  // Mock data for demonstration
  const mockFamilies: Familia[] = [
    { id: 1, nombre: "Electrónicos" },
    { id: 2, nombre: "Ropa" },
    { id: 3, nombre: "Hogar" },
    { id: 4, nombre: "Deportes" },
  ];




  const loadArticles = async () => {
    setLoading(true);
    // Simulate API call

    setFamilies(mockFamilies);
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
      get_stock: false,
      get_web: false,
      get_unidades: false,
      for_vendedor: false,
      get_imagenes: true,
      page: page,

    };
    try {

      // setid_col(id)
      const result: any = await APIs.getArticles(data);
      setArticles(result);
      setLoading(false);

    } catch (error) {
      console.log(error)

    }
  };

  useEffect(() => {
    if (!effectRan.current) {
      loadArticles();
      effectRan.current = true;
    }
  }, []);

  useEffect(() => {
    loadArticles();
  }, [page]);

  const handleFamiliesChange = (
    familia: Familia | { id: number; nombre: string },
  ) => {
    setSelectedFamilie(familia.id);
    setSelectFamilies(false);
  };

  const searchArticle = async () => {
    setPage(1);
    setLoading(true);
    const data = {
      id: 0,
      activos: true,
     nombre: descripcion !== '' ? descripcion : '',
      codigo: code !== '' ? code : '',
      familia: 0,
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

      // setid_col(id)
      const result: any = await APIs.getArticles(data);
      setArticles(result);
      setLoading(false);
    } catch (error) {
      console.log(error)

    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      searchArticle();
    }
  };

  const editArticle = (article: Article, type: any) => {
    setEditingArticle(article);
    setTypeModal(type);
    setShowModal(true);
  };

  const createNewArticle = (value: string) => {
    setEditingArticle(null);
    setShowModal(true);
    setTypeModal(value)
  };

  // const handleSaveArticle = (articleData: Partial<Article>) => {
  //   if (editingArticle) {
  //     // Update existing article
  //     setArticles((prev: any) =>
  //       prev.map((article: any) =>
  //         article.id === editingArticle.id
  //           ? { ...article, ...articleData }
  //           : article,
  //       ),
  //     );
  //   } else {
  //     // Create new article
  //     const newArticle: Article = {
  //       id: Date.now(),
  //       codigo: articleData.codigo || "",
  //       descripcion: articleData.descripcion || "",
  //       familia: articleData.familia,
  //       activo: articleData.activo ?? true,
  //     };
  //     setArticles((prev: any) => [newArticle, ...prev]);
  //   }
  //   setShowModal(false);
  //   setEditingArticle(null);
  // };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingArticle(null);
  };

  const selectedFamilyName = selectedFamilie
    ? families.find((f) => f.id === selectedFamilie)?.nombre || "Todos"
    : "Todos";

  return (
    <div className="articles">
      <div className="container__articles">


        {/* Search and filters */}
        <div className="row__one">
          <div className="form-group">
            <label htmlFor="code">

              Código
            </label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyUp={handleKeyPress}
              placeholder="Ingresa el código"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">

              Descripción
            </label>
            <input
              id="description"
              type="text"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              onKeyUp={handleKeyPress}
              placeholder="Ingresa la descripción"
            />
          </div>

          <div className="form-group">
            <label>

              Familias
            </label>
            <div className="select-container">
              <div className="select-trigger" onClick={() => setSelectFamilies(!selectFamilies)}>
                <span>{selectedFamilyName}</span>
                <ChevronDown className="icon-sm" />
              </div>
              {selectFamilies && (
                <div className="select-dropdown">
                  <div className="select-option" onClick={() => handleFamiliesChange({ id: 0, nombre: "Todos" })}>
                    Todos
                  </div>
                  {families.map((familia) => (
                    <div key={familia.id} className="select-option" onClick={() => handleFamiliesChange(familia)}>
                      {familia.nombre}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="action-buttons">
            <button className="btn-primary" onClick={searchArticle}>
              <Search className="icon-sm" />
              Buscar
            </button>
            <button className="btn-success" onClick={() => createNewArticle('create')}>
              <Plus className="icon-sm" />
              Crear Artículo
            </button>
          </div>

          {/* <div className="form-group">
            <label>Tipo</label>
            <div className="radio-group">
              <label className="radio-item">
                <input
                  type="radio"
                  name="tipo"
                  checked={typeService === 1}
                  onChange={() => handleTypeArticleChange(1)}
                />
                <span>Producto</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="tipo"
                  checked={typeService === 0}
                  onChange={() => handleTypeArticleChange(0)}
                />
                <span>Servicio</span>
              </label>
            </div>
          </div> */}

          <div className="form-group">

            {/* <div className="radio-group">
              <label className="radio-item">
                <input
                  type="radio"
                  name="estado"
                  checked={typeActive === 1}
                  onChange={() => handleActivesArticleChange(1)}
                />
                <span>Activos</span>
              </label>
              <label className="radio-item">
                <input
                  type="radio"
                  name="estado"
                  checked={typeActive === 0}
                  onChange={() => handleActivesArticleChange(0)}
                />
                <span>Inactivos</span>
              </label>
            </div> */}
          </div>

          <div className="form-group actions-group">


          </div>
        </div>


        {/* Articles table */}
        <div className="table__articles">
          <div className="table__head">
            <div className="thead">
              <div>Código</div>
              <div>Descripción</div>
              <div>Acciones</div>
            </div>
          </div>

          <div className="table__body">
            {loading ? (
              <div className="loading_modal">
                <div className="text_article_loading">Cargando datos...</div>
              </div>
            ) : articles.length > 0 ? (
              articles.map((article: any) => (
                <div key={article.id} className="tbody__container">
                  <div className="tbody">
                    <div>{article.codigo}</div>
                    <div>{article.descripcion}</div>
                    <div>
                      <button
                        className="edit-btn"
                        onClick={() => editArticle(article, 'update')}
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
                <div className="text_article_loading">
                  No se encontraron artículos
                </div>
              </div>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="btn-outline"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeft className="icon-sm" />
              Anterior
            </button>
            <span className="page-info">Página {page}</span>
            <button className="btn-outline" onClick={() => setPage(page + 1)}>
              Siguiente
              <ChevronRight className="icon-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Article Modal */}
      <ArticleModal
        isOpen={showModal}
        typeModal={typeModal}
        onClose={handleCloseModal}
   
        article={editingArticle}
      />
    </div>
  );
};

export default Articles;
