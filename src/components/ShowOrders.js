import React, {
  useCallback,
  useReducer,
  useEffect,
  useState,
  useContext,
} from "react";
import CheckedBox from "./CheckedBox";
import "./ShowOrders.css";
import { Link } from "react-router-dom";
import Input from "./Input";
import ModalInfo from "./ModalInfo";
import ModalError from "./ModalError";
import AuthContext from "./../context/auth-context";

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

const ShowOrders = () => {
  const auth = useContext(AuthContext);
  const [elementId, setElementId] = useState();
  const [errorModal, setErrorModal] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState();
  const [nextPage, setNextPage] = useState();
  const [realised, setRealised] = useState();

  useEffect(() => {
    const func = async () => {
      const storedData = JSON.parse(localStorage.getItem("userData"));
      try {
        setIsLoading(true);
        setError(false);
        const response = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/order?page=${page}`,
          "GET",
          null,
          {
            authorization: `Bearer ${storedData.token}`,
          }
        );
        setData(response.orders);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err.message);
      }
    };

    func();
  }, [nextPage]);

  const handleRealise = async (el) => {
    try {
      setError(false);
      setIsLoading(true);
      setNextPage(0);

      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/order/${el._id}`,
        "PATCH",
        JSON.stringify({
          relised: true,
        }),
        {
          authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      setNextPage(1);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);

      setError(err.message);
    }
  };

  const handleNoRealise = async (el) => {
    try {
      setError(false);
      setNextPage(0);

      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/order/${el._id}`,
        "PATCH",
        JSON.stringify({
          relised: false,
        }),
        {
          authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      setNextPage(1);
    } catch (err) {
      setError(err.message);
    }
  };
  const deleteElement = async (id) => {
    try {
      setNextPage(0);
      setError(false);
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/order/${id}`,
        "DELETE",
        {},
        { authorization: `Bearer ${auth.token}` }
      );
    } catch (err) {
      setNextPage(1);

      setError(err.message);
    }
  };
  return (
    <React.Fragment>
      <div className='shop-contentd'>
        <ModalInfo show={error} onCancel={() => setError(false)}>
          {`${error}`}
        </ModalInfo>
        <ModalError
          show={errorModal}
          handleFunc={() => deleteElement(elementId)}
          onCancel={() => setErrorModal(false)}
        >
          Czy na pewno chcesz usunąć to zamówienie?
        </ModalError>
        {data && data.length === 0 && (
          <div>
            <h1 style={{ textAlign: "center" }}>Pusta Strona</h1>
          </div>
        )}
        {data &&
          data.map((el) => {
            const data = Date.parse(el.createdAt);
            const newData = new Date(data);
            const year = newData.getFullYear();

            const month = newData.getMonth() + 1;
            const day = newData.getDate();
            const hours = newData.getHours();
            const minutes = newData.getMinutes();
            return (
              <div className='order'>
                <h1>Nazwa opony: {el.opona.name}</h1>
                <h4>
                  Data zakupu: {day}-{month}-{year} {hours}:{minutes}
                </h4>
                <h4>Cena za sztukę: {el.opona.price.toFixed(2)} PLN</h4>
                <h4>Liczba sztuk: {el.ile}</h4>
                <h4>
                  Rodzaj zapłaty:{" "}
                  {el.dostawa === "P24" ? "Płatność z przelewy24" : el.dostawa}
                </h4>

                <h4>
                  Cena za całość: {(el.ile * el.opona.price).toFixed(2)} PLN
                </h4>
                <h3> Imie i Nazwisko: {el.imieinazwisko} </h3>
                <h3>
                  Adres: {el.adres} {el.postal} {el.city}
                </h3>
                <h3>Telefon: {el.phone}</h3>
                <h3>Email: {el.email}</h3>
                {el.relised && <h3 style={{ color: "green" }}>Zrealizowane</h3>}
                {el.oplacone && (
                  <h3 style={{ color: "green" }}>Oplacone na P24</h3>
                )}
                <div className='buttons'>
                  <button
                    className='btn'
                    onClick={() => {
                      handleRealise(el);
                    }}
                  >
                    Oznacz jako zrealizowane
                  </button>
                  <button
                    className='btn'
                    onClick={() => {
                      handleNoRealise(el);
                    }}
                  >
                    Oznacz jako niezrealizowane
                  </button>
                  <button
                    className='btn'
                    onClick={() => {
                      setErrorModal(true);
                      setElementId(el._id);
                    }}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            );
          })}
      </div>
      <div className='page-set'>
        {page > 1 && (
          <button
            className='btn left'
            onClick={async () => {
              setIsLoading(true);
              try {
                setError(false);
                const response = await sendRequest(
                  `${process.env.REACT_APP_API_URL}/api/order?page=${page - 1}`,
                  "GET",
                  null,
                  {
                    authorization: `Bearer ${auth.token}`,
                  }
                );

                setData(response.orders);
                setPage(page - 1);
                setIsLoading(false);
              } catch (err) {
                setError(err.message);
                setIsLoading(false);
              }
            }}
          ></button>
        )}
        {page && (
          <button
            className='btn right'
            onClick={async () => {
              setIsLoading(true);

              try {
                setError(false);
                const response = await sendRequest(
                  `${process.env.REACT_APP_API_URL}/api/order?page=${page + 1}`,
                  "GET",
                  null,
                  {
                    authorization: `Bearer ${auth.token}`,
                  }
                );

                setData(response.orders);
                setPage(page + 1);
                setIsLoading(false);
              } catch (err) {
                setIsLoading(false);

                setError(err.message);
              }
            }}
          ></button>
        )}
      </div>
    </React.Fragment>
  );
};

export default ShowOrders;
