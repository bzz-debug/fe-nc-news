import { deleteComment } from './api';
import { useState } from 'react';

function Comments({ comment, loggedInUser, storedLoggedInUser }) {
  const { comment_id } = comment;
  const [isDeleted, setIsDeleted] = useState(false);

  // console.log(storedLoggedInUser);

  const handleDelete = (event) => {
    setIsDeleted(true);
    deleteComment(comment_id);
    console.log(comment);
  };

  return (
    <>
      {!isDeleted ? (
        <div className="comment-card">
          <span>
            <b>{comment.author}:</b>
          </span>
          <span> {comment.body}</span>
          <p id="votes">
            <u>Votes: {comment.votes}</u>
          </p>
          {loggedInUser === comment.author ? (
            <button onClick={handleDelete} id="delete-button">
              Delete Comment
            </button>
          ) : null}
        </div>
      ) : (
        <p>comment deleted!</p>
      )}
    </>
  );
}
export default Comments;
