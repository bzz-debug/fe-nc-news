import { Link, useNavigate, useParams } from 'react-router-dom';
import api, { getArticles } from './api';
import { useState, useEffect } from 'react';
import ArticleCards from './ArticleCards';

function ArticleList({ articleId, setArticleId }) {
  const [articleList, setArticleList] = useState([]);
  const [topicName, setTopicName] = useState('');

  // const { nameOfTopic } = useParams();

  function handleTopicChange(nameOfTopic) {
    setTopicName(nameOfTopic);
  }

  useEffect(() => {
    getArticles(topicName).then((result) => {
      console.log(result.data.articles, topicName);
      if (result.data.articles) {
        setArticleList(result.data.articles);
      }
    });
  }, [topicName]);

  // I have eventually, after many hours, managed to get the URL to change when I filter by topic. However, I have had to hard code it in, as you can see below. Please let me know how I can do this more dynamically.

  return (
    <>
      <header>
        <Link to="/articles/">
          <button onClick={() => handleTopicChange('')}>All</button>
        </Link>
        <Link to="/articles/cooking">
          <button onClick={() => handleTopicChange('cooking')}>Cooking</button>
        </Link>
        <Link to="/articles/coding">
          <button onClick={() => handleTopicChange('coding')}>Coding</button>
        </Link>
        <Link to="/articles/football">
          <button onClick={() => handleTopicChange('football')}>
            Football
          </button>
        </Link>
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
