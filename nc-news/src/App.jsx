import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router";
import Home from "./Home";
import ArticleList from "./ArticleList";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <header>{/* Nav Bar */}</header>
      <main>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/articles" element={<ArticleList />}></Route>
        </Routes>
        ;
      </main>
    </>
  );
}

export default App;
