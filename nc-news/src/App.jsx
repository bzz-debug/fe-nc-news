import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Home";
import ArticleList from "./ArticleList";
import SingleArticle from "./SingleArticle";

function App() {
  const [count, setCount] = useState(0);
  const [articleId, setArticleId] = useState("");

  return (
    <>
      <header>{/* Nav Bar */}</header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/articles"
            element={
              <ArticleList setArticleId={setArticleId} articleId={articleId} />
            }
          />
          <Route path="articles/:article_id" element={<SingleArticle />} />
        </Routes>
        ;
      </main>
    </>
  );
}

export default App;
