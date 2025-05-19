function ArticleCards({ article }) {
  return (
    <>
      <div className="article-card">
        <h2>{article.title}</h2>
        <h3>topic: {article.topic}</h3>
        <h3>author: {article.author}</h3>
      </div>
    </>
  );
}
export default ArticleCards;
