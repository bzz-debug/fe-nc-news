import { Link } from "react-router";
import api from "./api";
import { useState, useEffect } from "react";
import ArticleCards from "./ArticleCards";

function ArticleList() {
  const [articleList, setArticleList] = useState([]);
  const [topicName, setTopicName] = useState("");

  useEffect(() => {
    api
      .get(
        `https://bzz-nc-news.onrender.com/api/articles?topic_name=${topicName}`
      )
      .then((result) => {
        console.log(result.data.articles);
        setArticleList(result.data.articles);
      });
  }, []);

  return (
    <>
      <div id="article-wrapper">
        <h1 id="article-list-title">ALL ARTICLES</h1>
        {articleList.map((article) => {
          return <ArticleCards article={article} />;
          return "Hello from the article list";
        })}
      </div>
    </>
  );
}
export default ArticleList;
