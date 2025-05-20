import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, { getArticleById, getCommentsByArticleId } from "./api";
import Comments from "./Comments";

function SingleArticle() {
  const [article, setArticle] = useState("");
  const [commentsList, setCommentsList] = useState([]);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id).then((result) => {
      setArticle(result.data.article);
    });
  }, [article_id]);

  useEffect(() => {
    getCommentsByArticleId(article_id).then((result) => {
      setCommentsList(result.data.comments);
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
        <p id="comment-title">
          <b>Comments: {article.comment_count}</b>
        </p>
      </div>
      <div id="comments-wrapper">
        {commentsList.map((comment) => {
          return <Comments comment={comment} />;
        })}
      </div>
    </>
  );
}
export default SingleArticle;
