import { useState } from "react";
import { ArticleSearch } from "./ArticleSearch";
import { SelectedArticles } from "./SelectedArticles";
import "./styles/CollectionBuilder.css";
import { storeCollection } from "../../../../../zustand/Collection";
import APIs from "../../../../../services/services/APIs";
import Swal from 'sweetalert2';
import useUserStore from "../../../../../zustand/General";

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
}



export function CollectionBuilder() {
  const [collectionName, setCollectionName] = useState("");
  const userState = useUserStore(state => state.user);
  const user_id = userState

  console.log(user_id)

  const { article }: any = storeCollection()



  console.log(article)

  const handleSave = async () => {

    let filter = article.map((x: any) => x.id)

    let data = {
      id: 0,
      nombre: '',
      id_familia: 0,
      id_empresa: 0,
      id_sucursal: user_id.sucursal_id,
      empresa: {
        id: 0,
        razon_social: ''
      },
    
      img: '',
      status: true,
      colecciones_art: filter,
      colecciones_suc: [
        user_id.sucursal_id,
      ],
      colecciones_art_piv: [],
      colecciones_suc_piv: [],
      articulos_remove: [],
      sucursales_remove: []

    }

    await APIs.CreateAny(data, "create_coleccion/create")
      .then(async (response: any) => {
        console.log(response)
      })
      .catch((error: any) => {
        if (error.response) {
          if (error.response.status === 409) {
            Swal.fire(error.mensaje, '', 'warning');
          } else {
            Swal.fire('Error al actualizar la crear', '', 'error');
          }
        } else {
          Swal.fire('Error de conexión.', '', 'error');
        }
      })


  };


  return (
    <div className="collection-builder">
      <div className="container">
        <header className="collection-builder-header">

          <div className="collection-builder-title">
            <div className="collection-builder-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 5V19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M5 12H19"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h1>Nueva colección</h1>
          </div>
        </header>

        <div className="collection-builder-content">
          <div className="collection-builder-left">
            <div className="collection-name-section">
              <label htmlFor="collection-name" className="label">
                Nombre de la colección
              </label>
              <input
                id="collection-name"
                type="text"
                placeholder="Ingresa el nombre..."
                value={collectionName}
                onChange={(e) => setCollectionName(e.target.value)}
                className="input"
              />
            </div>

            <div className="article-search-section">
              <h3>Buscar artículos</h3>
              <ArticleSearch />
            </div>
          </div>

          <div className="collection-builder-right">
            <div className="selected-articles-header">
              <h3>Artículos seleccionados ({article.length})</h3>
              <button
                onClick={handleSave}
                className="btn btn-primary">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16L21 8V19C21 20.1046 20.1046 21 19 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                  <path
                    d="M17 21V13H7V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                  <path
                    d="M7 3V8H15"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round" />
                </svg>
                Guardar
              </button>
            </div>
            <SelectedArticles
          
            />
          </div>
        </div>
      </div>
    </div>
  );
}
