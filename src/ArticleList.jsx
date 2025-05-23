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
  const [topicErr, setTopicErr] = useState(false);

  /*
  
  the error handling isnt working because i have two useEffects which are both working at the same time and conflicting with each other, so if I set error state in both of them, the browser doesnt know whether to rendor an error and will render the last state.

  I need to combine the two into one useEffect function.

  Jim advised that I should also handle the get requests with one function and pass it three params. 

  I am thinking I could maybe just call the getArticles function and pass a ${query} variable to it, as well as the three params. This may then enable me to make dynamic get requests that cover all potential queries. This MIGHT then also let me handle errors dynamically, when the user puts in a dodgy URL on the main page 

  */

  const { topic } = useParams();
  console.log(topic);

  // function handleQuery(event) {
  //   console.log(event.target.value);
  // }

  const sortBy = searchParams.get('sort_by');
  // console.log(value);
  const orderBy = searchParams.get('order') || 'desc';
  console.log(orderBy);

  // useEffect(() => {
  //   getArticlesSorted(value, orderBy)
  //     .then((result) => {
  //       console.log(result);
  //       setArticleList(result.data.articles);
  //     })
  //     .catch((err) => {
  //       console.log(err.response.data);
  //       setTopicErr(err.response.data);
  //     });
  // }, [value, orderBy]);

  // getArticlesSorted(searchParams.sort_by);

  // function handleTopicChange(nameOfTopic) {
  //   setTopicName(nameOfTopic);
  // }

  useEffect(() => {
    if (topic) {
      getArticles(topic, sortBy, orderBy)
        .then((result) => {
          console.log(result.data.articles, topic);
          if (result.data.articles) {
            setArticleList(result.data.articles);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setTopicErr(err.response.data.message);
        });
    } else {
      getArticles('', sortBy, orderBy)
        .then((result) => {
          console.log(result.data.articles, topic);
          if (result.data.articles) {
            setArticleList(result.data.articles);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [topic, sortBy, orderBy]);

  return (
    <>
      {topicErr ? (
        <h1>{topicErr}</h1>
      ) : (
        <div>
          <header>
            <Link className="topic-buttons" to="/articles/">
              All
            </Link>
            <Link className="topic-buttons" to="/articles/cooking">
              Cooking
            </Link>
            <Link className="topic-buttons" to="/articles/coding">
              Coding
            </Link>
            <Link className="topic-buttons" to="/articles/football">
              Football
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
                    setSearchParams({
                      sort_by: sortBy,
                      order: event.target.value,
                    });
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
              return (
                <ArticleCards article={article} key={article.article_id} />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
export default ArticleList;
