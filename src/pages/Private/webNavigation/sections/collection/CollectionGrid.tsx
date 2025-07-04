import "./styles/CollectionGrid.css";

interface Collection {
  id: string;
  name: string;
  articles: Array<{
    id: string;
    title: string;
    description: string;
    category: string;
  }>;
}

interface CollectionGridProps {
  collections: Collection[];
}

export function CollectionGrid({ collections }: CollectionGridProps) {
  return (
    <div className="collection-grid">
      <h2 className="collection-grid-title">Tus colecciones</h2>
      <div className="collection-grid-container">
        {collections.map((collection) => (
          <div key={collection.id} className="collection-card">
            <div className="collection-card-header">
              <div className="collection-card-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
              <h3 className="collection-card-name">{collection.name}</h3>
            </div>
            <p className="collection-card-count">
              {collection.articles.length}{" "}
              {collection.articles.length === 1 ? "artículo" : "artículos"}
            </p>
            <div className="collection-card-articles">
              {collection.articles.slice(0, 3).map((article) => (
                <div key={article.id} className="collection-article-item">
                  • {article.title}
                </div>
              ))}
              {collection.articles.length > 3 && (
                <div className="collection-article-more">
                  +{collection.articles.length - 3} más
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
