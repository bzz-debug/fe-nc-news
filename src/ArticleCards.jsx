import { useState } from "react";
import { Link } from "react-router";

function ArticleCards({ article, articleId, setArticleId }) {
  const dateOnly = new Date(article.created_at).toISOString().slice(0, 10);

  return (
    <>
      <Link to={`/articles/single/${article.article_id}`}>
        <div id="article-card-wrapper">
          <div className="article-card">
            <div id="text-container">
              <h2>
                <b>
                  <u>{article.title}</u>
                </b>
              </h2>
              <h3>Topic: {article.topic}</h3>
              <h3>Author: {article.author}</h3>
            </div>
            <div id="img-div">
              <img src={article.article_img_url} id="article-card-img" />
            </div>
          </div>
          <span id="sort-by-features">
            <p>👍🏼{article.votes}</p>
            <p>🗨️ {article.comment_count}</p>
            {/* <p>{dateOnly}</p> */}
          </span>
        </div>

        {/* </button> */}
      </Link>
    </>
  );
}

export default ArticleCards;
