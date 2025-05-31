import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { Route, Routes, Link } from 'react-router';
import Home from './Home';
import ArticleList from './ArticleList';
import SingleArticle from './SingleArticle';
import { LogInContext } from './LoggedInUser';
import Logo from './assets/Logo.png';

function App() {
  const [count, setCount] = useState(0);

  function handleLogOut() {
    setLoggedInUser(null);
  }

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
        <header>
          <span id="nav-bar-span-1">
            <Link to="/">
              <nav>Home</nav>
            </Link>
            <Link>
              <nav>Search</nav>
            </Link>
          </span>

          <img src={Logo} alt="logo image" id="logo-image" />

          {isLoggedIn ? (
            <span id="nav-bar-span-2">
              <p id="username-banner">
                <b>{loggedInUser}</b>
              </p>
              <button id="logout-button" onClick={handleLogOut}>
                Log Out
              </button>
            </span>
          ) : (
            <span>
              <Link to="/">
                <button id="login-button">Log In</button>
              </Link>
            </span>
          )}
        </header>
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
