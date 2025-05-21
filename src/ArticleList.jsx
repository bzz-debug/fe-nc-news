import { Link } from "react-router";
import api, { getArticles } from "./api";
import { useState, useEffect } from "react";
import ArticleCards from "./ArticleCards";

function ArticleList({ articleId, setArticleId }) {
  const [articleList, setArticleList] = useState([]);
  const [topicName, setTopicName] = useState("");

  useEffect(() => {
    getArticles().then((result) => {
      setArticleList(result.data.articles);
    });
  }, []);

  return (
    <>
      <div id="article-wrapper">
        <h1 id="article-list-title">ALL ARTICLES</h1>
        {articleList.map((article) => {
          return <ArticleCards article={article} key={article.article_id} />;
        })}
      </div>
    </>
  );
}
export default ArticleList;
