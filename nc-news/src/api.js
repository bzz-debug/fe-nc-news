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

export default api;
