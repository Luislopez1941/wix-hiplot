import { useState, useEffect } from "react";
import { ArticleSearch } from "../ArticleSearch";
import { SelectedArticles } from "../SelectedArticles";
import "./styles/UpdateCollection.css";
import APIs from "../../../../../../services/services/APIs";
import Swal from 'sweetalert2';
import { storeCollection } from "../../../../../../zustand/Collection";

export function UpdateCollection({ onCancel, onDelete, index }: any) {
  const [collectionName, setCollectionName] = useState();
  const [selectedArticles, setSelectedArticles] = useState<any>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [removedArticles, setRemovedArticles] = useState<number[]>([]);


  useEffect(() => {
    // Limpiar artículos eliminados cuando se abre el modal
    setRemovedArticles([]);
  }, [index]);



  const { article, articleDelete }: any = storeCollection()
  console.log('dfdfadfsd', articleDelete)


  const handleRemoveArticle = (articleId: string) => {
    setSelectedArticles(selectedArticles.filter((a: any) => a.id !== articleId));
    
    // También actualizar el store de Zustand
    const setArticle = storeCollection(state => state.setArticle);
    const setArticleDelete = storeCollection(state => state.setArticleDelete);
    
    const currentArticles = storeCollection.getState().article;
    const currentDeleted = storeCollection.getState().articleDelete;
    
    const updatedArticles = currentArticles.filter((a: any) => a.id !== articleId);
    const articleToRemove = currentArticles.find((a: any) => a.id === articleId);
    
    if (articleToRemove) {
      setArticleDelete([...currentDeleted, articleToRemove.id]);
      setRemovedArticles(prev => [...prev, articleToRemove.id]);
    }
    setArticle(updatedArticles);
  };

  const updateColeccion = async (e: React.FormEvent) => {
    e.preventDefault();

    let data = {
      id: 0,
      tipo: 2,
      id_familia: 1,
      nombre: collectionName,
      img: '',
      status: true,
      colecciones_art: article.map((art: any) => art.id), 
      articulos_remove: removedArticles
    }

    console.log('🔄 ACTUALIZANDO colección:', data);
    console.log('🗑️ Artículos a eliminar:', removedArticles);
    
    await APIs.CreateAnyPut(data, "update_coleccion/update")
      .then(async (response: any) => {
        Swal.fire('Notificación', response.mensaje, 'success');

      })
      .catch((error: any) => {
        if (error.response) {
          if (error.response.status === 409) {
            Swal.fire(error.mensaje, '', 'warning');
          } else {
            Swal.fire('Error al actualizar la combinacion', '', 'error');
          }
        } else {
          Swal.fire('Error de conexión.', '', 'error');
        }
      })
  }

  const handleDelete = () => {

  };




  return (
    <div className="collection-editor">
      <div className="container">
        <header className="collection-editor-header">
          <button onClick={onCancel} className="btn btn-ghost back-button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 12H5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 19L5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Volver
          </button>
          <div className="collection-editor-title">
            <div className="collection-editor-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M17 3C17.2652 3 17.5196 3.10536 17.7071 3.29289C17.8946 3.48043 18 3.73478 18 4V20C18 20.2652 17.8946 20.5196 17.7071 20.7071C17.5196 20.8946 17.2652 21 17 21H7C6.73478 21 6.48043 20.8946 6.29289 20.7071C6.10536 20.5196 6 20.2652 6 20V4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M9 7H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> <path d="M9 11H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /> <path d="M9 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <h1>Editar colección</h1>
          </div>
        </header>

        <div className="collection-editor-content">
          <div className="collection-editor-left">
            <div className="collection-name-section">
              <label htmlFor="collection-name" className="label">
                Nombre de la colección
              </label>
              <input id="collection-name" type="text" placeholder="Ingresa el nombre..." value={collectionName} onChange={(e: any) => setCollectionName(e.target.value)} className="input" />
            </div>
            <div className="article-search-section">
              <h3>Agregar más artículos</h3>
              <ArticleSearch />
            </div>
          </div>

          <div className="collection-editor-right">
            <div className="selected-articles-header">
              <h3>Artículos en la colección ({selectedArticles?.length})</h3>
              <div className="header-actions">
                <button onClick={updateColeccion} className="btn btn-primary" >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"> <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16L21 8V19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M17 21V13H7V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 3V8H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  {/* {hasChanges ? "Guardar cambios" : "Sin cambios"} */}
                </button>
                {onDelete && (
                  <button onClick={() => setShowDeleteConfirm(true)} className="btn btn-danger">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"> <path d="M3 6H5H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    Eliminar
                  </button>
                )}
              </div>
            </div>
            <SelectedArticles articulos={selectedArticles}
              onRemove={handleRemoveArticle}
            />
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h3>Confirmar eliminación</h3>
              </div>
              <div className="modal-body">
                {/* <p>
                  ¿Estás seguro de que quieres eliminar la colección "
                  <strong>{selectedCollection?.name}</strong>"?
                </p> */}
                <p className="warning-text">
                  Esta acción no se puede deshacer.
                </p>
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-secondary">
                  Cancelar
                </button>
                <button onClick={handleDelete} className="btn btn-danger">
                  Eliminar colección
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
