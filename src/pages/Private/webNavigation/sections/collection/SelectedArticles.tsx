import { ArticleCard } from "./ArticleCard";
import "./styles/SelectedArticles.css";
import { storeCollection } from "../../../../../zustand/Collection";



export function SelectedArticles() {
  const { article }: any = storeCollection()

  if (article.length === 0) {
    return (
      <div className="selected-articles-empty">
        <div className="empty-icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M3 7L12 13L21 7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p>No hay artículos seleccionados</p>
        <span>Busca y añade artículos a tu colección</span>
      </div>
    );
  }

  return (
    <div className="selected-articles">
      <div className="selected-articles-list">
        {article.map((a: any, index: number) => (
          <ArticleCard
            key={a.id}
            a={a}
            index={index}
            onRemove={() => onRemove(a.id)}
            variant="selected"
          />
        ))}
      </div>
    </div>
  );
}
