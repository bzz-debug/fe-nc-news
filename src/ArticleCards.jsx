import { useState } from "react";
import { Link } from "react-router";

function ArticleCards({ article, articleId, setArticleId }) {
  return (
    <>
      <Link to={`/articles/${article.article_id}`}>
        {/* <button> */}
        <div className="article-card">
          <h2>{article.title}</h2>
          <h3>topic: {article.topic}</h3>
          <h3>author: {article.author}</h3>
        </div>
        {/* </button> */}
      </Link>
    </>
  );
}

export default ArticleCards;
