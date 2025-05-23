import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Route, Routes } from 'react-router';
import Home from './Home';
import ArticleList from './ArticleList';
import SingleArticle from './SingleArticle';
import { LogInContext } from './LoggedInUser';

function App() {
  const [count, setCount] = useState(0);

  const storedLoggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const [loggedInUser, setLoggedInUser] = useState(storedLoggedInUser);
  const isLoggedIn = loggedInUser !== null;

  useEffect(() => {
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  return (
    <>
      <LogInContext.Provider
        value={{
          loggedInUser,
          setLoggedInUser,
          isLoggedIn,
          storedLoggedInUser,
        }}
      >
        <header>{/* Nav Bar */}</header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route
              path="articles/single/:article_id"
              element={<SingleArticle />}
            />
            <Route path="articles/:topic" element={<ArticleList />} />
          </Routes>
          ;
        </main>
      </LogInContext.Provider>
    </>
  );
}

export default App;
