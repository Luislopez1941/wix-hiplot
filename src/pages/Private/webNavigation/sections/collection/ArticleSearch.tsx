import {  useState } from "react";
import { ArticleCard } from "./ArticleCard";
import "./styles/ArticleSearch.css";
import APIs from "../../../../../services/services/APIs";
import { storeCollection } from "../../../../../zustand/Collection";


export function ArticleSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const { article }: any = storeCollection();      
  const setArticle = storeCollection(state => state.setArticle);
  const [articles, setArticles] = useState<any>([]);

        

  const handleAddArticle = async () => {
    let data = {
      activos: true,
      codigo: "",
      familia: 0,
      // get_web: true,
      id_usuario: 3,
      tipo: 2,
      materia_prima: 2,
      nombre: searchTerm,
      // page: 1,
      proveedor: 0
    };







    try {
      let respose = await APIs.getArticlesGlobal(data);
      setArticles(respose)
    } catch (error) {
      console.log('Error')


    }

  };



  const onAddArticle = (item: any) => {
    setArticle([...article, item])
  }

  return (
    <div className="article-search">
      <div className="search-controls">
        <div className="search-input-container">
          <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none"> <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" /> <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          <input type="text" placeholder="Buscar artículos..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="input search-input" />
          <button onClick={handleAddArticle}>Buscar</button>
        </div>
      </div>
      <div className="search-results">
        <p className="results-count">
          {articles?.length}{" "}
          {articles?.length === 1 ? "artículo" : "artículos"}
        </p>

        <div className="articles-list">
          {articles?.length > 0 ? (

            articles?.map((a: any) => (<ArticleCard key={a.id} a={a} onAdd={() => onAddArticle(a)} variant="search" />))
          ) : (
            <div className="no-results">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
                <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p>No se encontraron artículos</p>
              <span>Intenta ajustar tu búsqueda o filtro</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
