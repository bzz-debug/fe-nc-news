import { useParams } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import api, {
  getArticleById,
  getCommentsByArticleId,
  patchApiVotesDown,
  patchApiVotesUp,
  postNewComment,
} from './api';
import Comments from './Comments';
import { LogInContext } from './LoggedInUser';

function SingleArticle() {
  const [article, setArticle] = useState('');
  const [commentsList, setCommentsList] = useState([]);
  const [hasUpVoted, setHasUpVoted] = useState(false);
  const [hasDownVoted, setHasDownVoted] = useState(false);
  const [err, setErr] = useState(false);
  const [commentData, setCommentData] = useState({
    username: '',
    body: '',
  });
  const [renderedCommentData, setRenderedCommentData] = useState({});
  const [commentErr, setCommentErr] = useState(false);
  const [commentPosted, setCommentPosted] = useState(false);
  const [articleErr, setArticleErr] = useState(false);
  const { setLoggedInUser, loggedInUser, isLoggedIn, storedLoggedInUser } =
    useContext(LogInContext);
  // console.log(loggedInUser);

  const { article_id } = useParams();

  useEffect(() => {
    getArticleById(article_id)
      .then((result) => {
        setArticle(result.data.article);
      })
      .catch((err) => {
        console.log(err);
        setArticleErr(true);
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
      username: loggedInUser,
      [key]: value,
    });
    console.log(commentData);
  }
  function handleSubmitComment(event) {
    event.preventDefault();
    setRenderedCommentData({
      username: commentData.username,
      body: commentData.body,
    });
    console.log(commentData);
    postNewComment(article_id, commentData)
      .then((result) => {
        console.log(result);

        setCommentPosted(true);
        setCommentErr(false);
      })
      .then((result) => {
        // setButtonClicked(true);
      })

      .catch((err) => {
        setCommentErr(err.response.data.message);
      });
  }
  console.log(loggedInUser);

  return (
    <>
      {articleErr ? (
        <h1>No article found!</h1>
      ) : (
        <div>
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
                votes:{' '}
                {hasUpVoted && !err
                  ? article.votes + 1
                  : hasDownVoted && !err
                  ? article.votes - 1
                  : article.votes}
              </b>
            </p>
            {err ? (
              <div>
                <p>Request failed, please try again</p>
                <button onClick={handleUpVote}>upvote</button>
                <button onClick={handleDownVote}>downvote</button>
              </div>
            ) : hasUpVoted || hasDownVoted ? (
              <p> Your vote has been counted! </p>
            ) : (
              <div>
                <button
                  className="vote-button"
                  id="upvote"
                  onClick={handleUpVote}
                >
                  upvote
                </button>
                <button
                  className="vote-button"
                  id="downvote"
                  onClick={handleDownVote}
                >
                  downvote
                </button>
              </div>
            )}
            <div>
              {isLoggedIn ? (
                <div id="new-comment-wrapper">
                  <h2>post a comment!</h2>
                  <form>
                    <label htmlFor="">
                      Your comment:
                      <textarea
                        name="body"
                        id=""
                        onChange={handleType}
                      ></textarea>
                    </label>{' '}
                    {commentPosted ? (
                      <p>comment posted!</p>
                    ) : (
                      <button
                        type="submit"
                        id="comment-submit-button"
                        onClick={handleSubmitComment}
                      >
                        Submit
                      </button>
                    )}
                    {commentErr ? <p> {commentErr} </p> : null}
                  </form>
                </div>
              ) : (
                <p>
                  Please <button> Log in</button>
                  to post a comment{' '}
                </p>
              )}

              <p id="comment-title">
                <b>Comments: {article.comment_count}</b>
              </p>
              <div id="comments-wrapper">
                {!commentErr ? (
                  <div id="optimistically-rendered-comment">
                    <span>
                      <b>{renderedCommentData.username}:</b>
                    </span>
                    <span> {renderedCommentData.body}</span>
                    <p></p>
                  </div>
                ) : null}

                {commentsList.map((comment) => {
                  return (
                    <Comments
                      comment={comment}
                      key={comment.comment_id}
                      loggedInUser={loggedInUser}
                      storedLoggedInUser={storedLoggedInUser}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SingleArticle;
