import "./styles/ArticleCard.css";
import { storeCollection } from "../../../../../zustand/Collection";


export function ArticleCard({
  a,
  index,
  variant,
  onAdd,
  onRemove,
}: any) {
  const setArticle = storeCollection(state => state.setArticle)
  const setArticleDelete = storeCollection(state => state.setArticleDelete)

  const { article, articleDelete }: any = storeCollection()

  const remove = () => {
    const articleToRemove = article[index];
    const filtered = article.filter((_: any, i: number) => i !== index);

    setArticleDelete([...articleDelete, articleToRemove.id]);
    setArticle(filtered);
  };



  return (
    <div className={`article-card article-card--${variant}`}>
      <div className="article-card-content">

        <div className="article-card-info">
          <div className="article-card-header">
            <h4 className="article-card-title">{a?.codigo}</h4>
          </div>
          <p className="article-card-description">{a?.description}</p>
        </div>

        <div className="article-card-action">
          {variant === "search" && onAdd && (
            <button onClick={onAdd} className="btn btn-sm btn-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
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
            </button>
          )}

          {variant === "selected" && (
            <button
              onClick={onRemove ? onRemove : remove}
              className="btn btn-sm btn-ghost remove-btn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 6L6 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
