import React from "react";
import "./ArticlesPop.css";
import { FaHandshake, FaCoins } from "react-icons/fa";

const ArticlesPop = () => {
  return (
    <React.Fragment>
      <div className='info'>
        <img
          src='https://images.pexels.com/photos/2346106/pexels-photo-2346106.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          alt=''
        />
        <div className='single-art'>
          <h2>Opony dla każdego</h2>
          <p>
            W ofercie sklepu znajdziesz opony terenowe, samochodowe oraz
            wzmacniane. Posiadamy opony zarówno nowe, jak i bieżnikowane.
          </p>
          <div className='list-profits'>
            <img
              src='https://wizytowki4you.pl/images/gwarancja-satyskacji-kolko.jpg'
              alt=''
            />
          </div>
        </div>
      </div>
      <div className='info'>
        <div>
          <h2>Szeroki wybór</h2>
          <div className='single-pair'>
            <FaHandshake size='7rem' color='black' />
            <p>W ofercie znajdziesz oferty różnych marek.</p>
          </div>
          <h2>Korzystne ceny</h2>

          <div className='single-pair'>
            <FaCoins size='6rem' color='black' />
            <p>Produkty w naszej ofercie posiadają konkurencyjne ceny.</p>
          </div>
        </div>
        <img
          src='https://images.pexels.com/photos/21694/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
          alt=''
        />
      </div>
    </React.Fragment>
  );
};
export default ArticlesPop;
