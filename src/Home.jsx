import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import api from './api';
import { LogInContext } from './LoggedInUser';

function Home() {
  const { setLoggedInUser, loggedInUser, isLoggedIn } =
    useContext(LogInContext);
  const [user, setUser] = useState({});
  console.log(user);

  function handleLogin(event) {
    event.preventDefault();
    setLoggedInUser(user);
  }

  return (
    <div className="category-buttons">
      <h1 className="title">Natter</h1>
      <label htmlFor="username-selection">Who are you: </label>
      <form onSubmit={handleLogin}>
        <select
          name="username-selection"
          onChange={(event) => {
            setUser(event.target.value);
          }}
        >
          <option value="tickle122">tickle122</option>
          <option value="grumpy19">grumpy19</option>
          <option value="happyamy2016">happyamy2016</option>
          <option value="cooljmessy">cooljmessy</option>
          <option value="weegembump">weegembump</option>
          <option value="jessjelly">jessjelly</option>
        </select>
        <input type="submit"></input>
      </form>
      <h2>{isLoggedIn ? 'Welcome: ' + loggedInUser : 'Welcome: Guest'}</h2>
      <Link to={'/articles'}>
        <button id="intro-button">Let's Gossip</button>
      </Link>
    </div>
  );
}
export default Home;
