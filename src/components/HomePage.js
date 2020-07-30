import React from "react";
import "./HomePage.css";
import ArticlesPop from "./ArticlesPop";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className='home-content'>
      <header className='showcase'>
        <div className='showcase-shadow'>
          <h2>Opony JAND</h2>
          <p>Opony na każdą okazję</p>
          <Link to='/shop'>
            <div className='btn'>Przeglądaj oferte</div>
          </Link>
        </div>
      </header>
      <ArticlesPop />
    </div>
  );
};

export default HomePage;
