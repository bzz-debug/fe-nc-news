function Comments({ comment }) {
  return (
    <div className="comment-card">
      <span>
        <b>{comment.author}:</b>
      </span>
      <span> {comment.body}</span>
      <p>
        <u>Votes: {comment.votes}</u>
      </p>
    </div>
  );
}
export default Comments;
