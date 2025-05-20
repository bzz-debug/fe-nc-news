import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "./api";

function SingleArticle() {
  const [article, setArticle] = useState("");
  const { article_id } = useParams();

  useEffect(() => {
    api
      .get(`https://bzz-nc-news.onrender.com/api/articles/${article_id}`)
      .then((result) => {
        setArticle(result.data.article);
        console.log(result.data.article);
      });
  }, []);

  return (
    <>
      <img
        src={article.article_img_url}
        alt="picture of some code on a screen"
      />
      <h1>{article.title}</h1>
      <h3>Author: {article.author}</h3>
      <div className="article-body-wrapper">
        <p>{article.body}</p>
        <p className="extras">
          <b>votes: {article.votes}</b>
        </p>
        <p className="extras">
          <b>comments:{article.comment_count}</b>
        </p>
      </div>
    </>
  );
}
export default SingleArticle;
