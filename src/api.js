import axios from "axios";

const api = axios.create({
  baseURL: "https://bzz-nc-news.onrender.com/api",
});

export const getArticles = (topicName) => {
  return api.get(
    `https://bzz-nc-news.onrender.com/api/articles?topic_name=${topicName}`
  );
};

export const getArticleById = (article_id) => {
  return api.get(`https://bzz-nc-news.onrender.com/api/articles/${article_id}`);
};

export const getCommentsByArticleId = (article_id) => {
  return api.get(
    `https://bzz-nc-news.onrender.com/api/articles/${article_id}/comments`
  );
};

export const patchApiVotesUp = (article_id) => {
  return api.patch(
    `https://bzz-nc-news.onrender.com/api/articles/${article_id}`,
    { inc_votes: 1 }
  );
};

export const patchApiVotesDown = (article_id) => {
  return api.patch(
    `https://bzz-nc-news.onrender.com/api/articles/${article_id}`,
    { inc_votes: -1 }
  );
};

export const postNewComment = (article_id, commentData) => {
  return api.post(
    `https://bzz-nc-news.onrender.com/api/articles/${article_id}/comments`,
    commentData
  );
};
// here is where I need to tie it to the form input value or something like that - check over what I did on the marketplace app.

export default api;
