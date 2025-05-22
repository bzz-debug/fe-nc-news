import { Link } from 'react-router-dom';
import api, { getArticles } from './api';
import { useState, useEffect } from 'react';
import ArticleCards from './ArticleCards';

function ArticleList({ articleId, setArticleId }) {
  const [articleList, setArticleList] = useState([]);
  const [topicName, setTopicName] = useState('');

  useEffect(() => {
    getArticles(topicName).then((result) => {
      console.log(result.data.filteredArticles, topicName);
      if (result.data.filteredArticles) {
        setArticleList(result.data.filteredArticles);
      }
    });
  }, [topicName]);
  // this is not working properly, it is sometimes giving me the necessary information, but most of the time the console log shows as undefined and the page doesnt change??? Very confused about what is happening here, I am concerned its a problem with the backend. I implemented almost identical code in the marketplace sprint and it worked.
  return (
    <>
      <header>
        <button onClick={() => setTopicName('cooking')}>Cooking</button>
        <button onClick={() => setTopicName('coding')}>Coding</button>
        <button onClick={() => setTopicName('football')}>Football</button>
      </header>
      <div id="article-wrapper">
        <h1 id="article-list-title">ALL ARTICLES</h1>
        {articleList.map((article) => {
          return <ArticleCards article={article} key={article.article_id} />;
        })}
      </div>
    </>
  );
}
export default ArticleList;
