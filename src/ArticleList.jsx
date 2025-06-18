import {
  Link,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import api, { getArticles, getArticlesSorted } from "./api";
import { useState, useEffect, useContext } from "react";
import ArticleCards from "./ArticleCards";
import { LogInContext } from "./LoggedInUser";

function ArticleList({ articleId, setArticleId }) {
  const [articleList, setArticleList] = useState([]);
  const [topicName, setTopicName] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [topicErr, setTopicErr] = useState(false);
  const { setLoggedInUser, loggedInUser, isLoggedIn, storedLoggedInUser } =
    useContext(LogInContext);

  const { topic } = useParams();
  console.log(topic);

  const sortBy = searchParams.get("sort_by");

  const orderBy = searchParams.get("order") || "desc";
  console.log(orderBy);

  useEffect(() => {
    if (topic) {
      getArticles(topic, sortBy, orderBy)
        .then((result) => {
          if (result.data.articles) {
            setArticleList(result.data.articles);
          }
        })
        .catch((err) => {
          console.log(err.response.data.message);
          setTopicErr(err.response.data.message);
        });
    } else {
      getArticles("", sortBy, orderBy)
        .then((result) => {
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
        <>
          <main>
            <div id="main-body">
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
            </div>
            <div id="article-wrapper">
              <span>
                {" "}
                <h1 id="article-list-title">
                  {topic ? topic.toUpperCase() : "ALL"} ARTICLES
                </h1>{" "}
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
          </main>
        </>
      )}
    </>
  );
}
export default ArticleList;
