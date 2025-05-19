import { useState, useEffect } from "react";
import { Link } from "react-router";
import api from "./api";

function Home() {
  return (
    <div className="category-buttons">
      <h1 className="title">Natter</h1>
      <Link to={"/articles"}>
        <button>Let's Gossip</button>
      </Link>
    </div>
  );
}
export default Home;
