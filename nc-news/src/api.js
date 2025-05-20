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

export default api;
