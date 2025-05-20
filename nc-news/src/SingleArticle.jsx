import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api, {
  getArticleById,
  getCommentsByArticleId,
  patchApiVotesDown,
  patchApiVotesUp,
  postNewComment,
} from "./api";
import Comments from "./Comments";

function SingleArticle() {
  const [article, setArticle] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);
  const [err, setErr] = useState(false);
  const [commentData, setCommentData] = useState({
    username: "",
    body: "",
  });
  const [commentErr, setCommentErr] = useState(false);

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

  function handleUpVote() {
    if (!hasUpVoted) {
      setHasUpVoted(true);
      patchApiVotesUp(article_id)
        .then((result) => {})
        .catch((err) => {
          setErr(true);
        });
    }
  }

  function handleDownVote() {
    if (!hasDownVoted) {
      setHasDownVoted(true);
      patchApiVotesDown(article_id)
        .then((result) => {})
        .catch((err) => {
          setErr(true);
        });
    }
  }

  function handleType(event) {
    const key = event.target.name;
    const value = event.target.value;

    setCommentData({
      ...commentData,
      [key]: value,
    });
  }
  function handleSubmitComment(event) {
    event.preventDefault();
    postNewComment(article_id, commentData)
      .then((result) => console.log(result))

      .catch((err) => {
        console.log(err.response.data.message);
        setCommentErr(err.response.data.message);
      });
  }

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
          <b>
            votes:{" "}
            {hasUpVoted && !err
              ? article.votes + 1
              : hasDownVoted && !err
              ? article.votes - 1
              : article.votes}
          </b>
        </p>
        {err ? (
          <>
            <p>Request failed, please try again</p>
            <button onClick={handleUpVote}>upvote</button>
            <button onClick={handleDownVote}>downvote</button>
          </>
        ) : hasUpVoted || hasDownVoted ? (
          <p> Your vote has been counted! </p>
        ) : (
          <>
            <button onClick={handleUpVote}>upvote</button>
            <button onClick={handleDownVote}>downvote</button>
          </>
        )}
        <div id="new-comment-wrapper">
          <h2>post a comment!</h2>
          <form>
            <label>
              Username:
              <input type="text" name="username" onChange={handleType} />
            </label>
            <label htmlFor="">
              Your comment:
              <textarea name="body" id="" onChange={handleType}></textarea>
            </label>{" "}
            <button type="submit" onClick={handleSubmitComment}>
              Submit
            </button>
            {commentErr ? <p> {commentErr} </p> : <p>Comment Posted!</p>}
          </form>
        </div>
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
