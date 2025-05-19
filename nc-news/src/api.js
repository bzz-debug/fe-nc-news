import axios from "axios";

const api = axios.create({
  baseURL: "https://bzz-nc-news.onrender.com/api",
});

// export const getArticles = () => {
//   api
//     .get(
//       `https://bzz-nc-news.onrender.com/api/articles?topic_name=${topicName}`
//     )
//     .then((result) => {
//       console.log(result);
//     });
// };

export default api;
