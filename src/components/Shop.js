import React, { useCallback, useReducer, useEffect, useState } from "react";
import CheckedBox from "./CheckedBox";
import "./Shop.css";
import { Link } from "react-router-dom";
import Input from "./Input";

const sendRequest = async (url, method = "GET", body = null, headers = {}) => {
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
    });
    const responseData = await response.json();
    if (!response.ok) {
      throw new Error(responseData.message);
    }
    return responseData;
  } catch (err) {
    throw err;
  }
};

const myReducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, [action.id]: action.value };
    default:
      return state;
  }
};
let startResponse;
let startNextPage;
const Shop = () => {
  const [tyres, setTyres] = useState();
  const [searchState, dispatch] = useReducer(myReducer, {});
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(searchState);
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/tyres?profil=${searchState.profil}&sezon=${searchState.sezon}&szerokosc=${searchState.szerokosc}&type=${searchState.type}&srednica=${searchState.srednica}&clas=${searchState.rodzaj}&sorty=${searchState.sorty}&page=1`
      );
      const nextPage = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/tyres?profil=${searchState.profil}&sezon=${searchState.sezon}&szerokosc=${searchState.szerokosc}&type=${searchState.type}&srednica=${searchState.srednica}&clas=${searchState.rodzaj}&sorty=${searchState.sorty}&page=2`
      );
      setNextPage(nextPage.tyres);
      setTyres(response.tyres);
      setPage(1);
    } catch (err) {}
  };
  const onInput = useCallback((id, value) => {
    dispatch({
      type: "SET_VALUE",
      id,
      value,
    });
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        setTyres(null);
        startResponse = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/tyres?profil=${searchState.profil}&sezon=${searchState.sezon}&szerokosc=${searchState.szerokosc}&type=${searchState.type}&srednica=${searchState.srednica}&clas=${searchState.rodzaj}&sorty=${searchState.sorty}&page=1`
        );
        startNextPage = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/tyres?profil=${searchState.profil}&sezon=${searchState.sezon}&szerokosc=${searchState.szerokosc}&type=${searchState.type}&srednica=${searchState.srednica}&clas=${searchState.rodzaj}&sorty=${searchState.sorty}&page=2`
        );
        setNextPage(startNextPage.tyres);
        setTyres(startResponse.tyres);
      } catch (err) {}
    };

    func();
  }, []);

  useEffect(() => {
    const func = async () => {
      try {
        setTyres(null);
        const response = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/tyres?profil=${searchState.profil}&sezon=${searchState.sezon}&szerokosc=${searchState.szerokosc}&type=${searchState.type}&srednica=${searchState.srednica}&clas=${searchState.rodzaj}&sorty=${searchState.sorty}&page=${page}`
        );
        const nextPage = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/tyres?profil=${
            searchState.profil
          }&sezon=${searchState.sezon}&szerokosc=${
            searchState.szerokosc
          }&type=${searchState.type}&srednica=${searchState.srednica}&clas=${
            searchState.rodzaj
          }&sorty=${searchState.sorty}&page=${page + 1}`
        );
        setNextPage(nextPage.tyres);
        setTyres(response.tyres);
      } catch (err) {}
    };

    func();
  }, [page]);
  return (
    <div className='shop-content'>
      <form className='form-filter' onSubmit={handleSubmit}>
        <div className='choice-box'>
          <h2>Typ opony</h2>
          <CheckedBox
            name='type'
            id='nowa'
            tytul='Nowa'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
          <CheckedBox
            name='type'
            tytul='Bieżnikowana'
            id='bieznikowana'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
        </div>
        <div className='choice-box'>
          <h2>Średnica Opony</h2>
          <Input
            id='srednica'
            element='select'
            options={["13", "14", "15", "16", "17"]}
            onInput={onInput}
          />
        </div>
        <div className='choice-box'>
          <h2>Szerokość Opony</h2>
          <Input
            id='szerokosc'
            element='select'
            options={[
              "135",
              "145",
              "155",
              "165",
              "175",
              "185",
              "195",
              "205",
              "215",
              "225",
              "235",
              "245",
              "255",
              "31",
              "33",
            ]}
            onInput={onInput}
          />
        </div>
        <div className='choice-box'>
          <h2>Profil Opony</h2>
          <Input
            id='profil'
            element='select'
            options={[
              "10.5",
              "12,5",
              "35",
              "40",
              "45",
              "50",
              "55",
              "60",
              "65",
              "70",
              "75",
              "80",
              "85",
            ]}
            onInput={onInput}
          />
        </div>
        <div className='choice-box'>
          <h2>Rodzaj Opony</h2>
          <CheckedBox
            name='rodzaj'
            tytul='Samochodowa'
            id='samochodowa'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
          <CheckedBox
            name='rodzaj'
            id='terenowa'
            tytul='Terenowa'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
          <CheckedBox
            name='rodzaj'
            id='wzmacniana'
            tytul='Wzmacniana'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
        </div>
        <div className='choice-box'>
          <h2>Sezon</h2>
          <CheckedBox
            name='sezon'
            tytul='Lato'
            id='lato'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
          <CheckedBox
            name='sezon'
            id='zima'
            tytul='Zima'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
          <CheckedBox
            name='sezon'
            id='allseason'
            tytul='All Season'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
        </div>
        <div className='choice-box'>
          <h2>Sortuj</h2>
          <CheckedBox
            name='sorty'
            tytul='Cena - rosnąco'
            id='up'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
          <CheckedBox
            name='sorty'
            id='down'
            tytul='Cena - malejąco'
            onInput={onInput}
            state={searchState}
          ></CheckedBox>
        </div>

        <button className='btn'>Filtruj</button>
        <div>
          <button className='btn' onClick={() => window.location.reload()}>
            Resetuj filtry
          </button>
        </div>
      </form>

      <div className='search-result'>
        {tyres &&
          tyres.map((el, index) => (
            <div className='tyre-item' key={index}>
              <h2>{el.name}</h2>
              <img
                src={`${process.env.REACT_APP_API_URL}/${el.imageCover}`}
                alt='sraka'
              />
              <div className='price-button'>
                <p>{el.price}.00 PLN</p>
                <Link to={`/tyres/${el._id}`}>
                  <button className='btn'> Sprawdz </button>
                </Link>
              </div>
            </div>
          ))}
      </div>
      <div className='page-set'>
        {page > 1 && (
          <button
            className='btn left'
            onClick={() => setPage(page - 1)}
          ></button>
        )}
        {nextPage && nextPage.length !== 0 && (
          <button
            className='btn right'
            onClick={() => setPage(page + 1)}
          ></button>
        )}
      </div>
    </div>
  );
};

export default Shop;

