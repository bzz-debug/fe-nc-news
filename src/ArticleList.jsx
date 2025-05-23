import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import api, { getArticles, getArticlesSorted } from './api';
import { useState, useEffect } from 'react';
import ArticleCards from './ArticleCards';

function ArticleList({ articleId, setArticleId }) {
  const [articleList, setArticleList] = useState([]);
  const [topicName, setTopicName] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();

  const { topic } = useParams();
  console.log(topic);

  function handleQuery(event) {
    console.log(event.target.value);
  }

  const value = searchParams.get('sort_by');
  // console.log(value);
  const orderBy = searchParams.get('order') || 'desc';
  console.log(orderBy);

  useEffect(() => {
    getArticlesSorted(value, orderBy).then((result) => {
      console.log(result);
      setArticleList(result.data.articles);
    });
  }, [value, orderBy]);

  // getArticlesSorted(searchParams.sort_by);

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
          <button
            className="topic-buttons"
            onClick={() => handleTopicChange('')}
          >
            All
          </button>
        </Link>
        <Link to="/articles/cooking">
          <button
            className="topic-buttons"
            onClick={() => handleTopicChange('cooking')}
          >
            Cooking
          </button>
        </Link>
        <Link to="/articles/coding">
          <button
            className="topic-buttons"
            onClick={() => handleTopicChange('coding')}
          >
            Coding
          </button>
        </Link>
        <Link to="/articles/football">
          <button
            className="topic-buttons"
            onClick={() => handleTopicChange('football')}
          >
            Football
          </button>
        </Link>
      </header>
      <div id="article-wrapper">
        <span>
          {' '}
          <h1 id="article-list-title">
            {topic ? topic.toUpperCase() : 'ALL'} ARTICLES
          </h1>{' '}
          <form action="" id="sort-by-dropdown">
            <label htmlFor="SORT BY">SORT BY</label>
            <select
              onChange={(event) => {
                setSearchParams({
                  sort_by: event.target.value,
                  order: orderBy,
                });
                handleQuery(event);
              }}
              name="SORT BY"
              id=""
            >
              SORT BY
              <option value="created_at">date</option>
              <option value="comment_count">comment count</option>
              <option value="votes">votes</option>
            </select>
            <select
              onChange={(event) => {
                setSearchParams({ sort_by: value, order: event.target.value });
                handleQuery(event);
              }}
              name="SORT BY"
              id=""
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </form>
        </span>

        {articleList.map((article) => {
          return <ArticleCards article={article} key={article.article_id} />;
        })}
      </div>
    </>
  );
}
export default ArticleList;
