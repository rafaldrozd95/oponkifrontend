import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./TyreInfo.css";
import Modal from "./Modal";
import AuthContext from "./../context/auth-context";
import ModalError from "./ModalError";
import { useHistory } from "react-router-dom";
import { AiOutlineZoomIn } from "react-icons/ai";

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

const TyreInfo = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [data, setData] = useState();
  const [imageNumber, setImageNumber] = useState(1);
  const [handleModal, setHandleModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const cancelModal = () => {
    setHandleModal(false);
  };
  const setModal = () => {
    setHandleModal(true);
  };
  const tid = useParams().tid;
  const deleteItem = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/tyres/${tid}`,
        "DELETE",
        {},
        { authorization: `Bearer ${auth.token}` }
      );
    } catch (err) {}
  };

  useEffect(() => {
    const func = async () => {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/tyres/${tid}`
        );
        setData(data.tyre);
      } catch (err) {}
    };
    func();
  }, [tid]);

  return (
    <div>
      <ModalError
        show={errorModal}
        handleFunc={deleteItem}
        onCancel={() => setErrorModal(false)}
        history={history}
      >
        Czy na pewno chcesz usunąć ten produkt?
      </ModalError>
      {data && (
        <React.Fragment>
          <Modal
            show={handleModal}
            image={data.image}
            number={imageNumber}
            onCancel={cancelModal}
          ></Modal>
          <div className='tyre-info'>
            <div className='tyre-ttitle'></div>
            <div className='tyre-images'>
              <div className='tyre-main-image'>
                <img
                  onClick={() => setModal(true)}
                  src={`${process.env.REACT_APP_API_URL}/${data.image[imageNumber]}`}
                ></img>
                <div className='lupa' onClick={() => setModal(true)}>
                  <AiOutlineZoomIn className='lupka' />
                </div>
              </div>
              <div className='tyre-small-images'>
                {data &&
                  data.image.map((el, index) => (
                    <img
                      onClick={() => {
                        setImageNumber(index);
                      }}
                      src={`${process.env.REACT_APP_API_URL}/${el}`}
                      alt='nic'
                      key={index}
                    />
                  ))}
                <div className='buttons-info'>
                  {auth.role === "admin" && (
                    <button className='btn' onClick={() => setErrorModal(true)}>
                      Usuń
                    </button>
                  )}
                  {auth.role === "admin" && (
                    <Link to={`/tyres/update/${tid}`}>
                      <div className='btn edit'>Edytuj</div>
                    </Link>
                  )}
                  <div className='orderius'>
                    {" "}
                    <Link to={`/order/${tid}`}>
                      <div className='btn edit'>Zamów</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className='tyre-specs'>
              <div className='producent-image'>
                <img
                  src={`${process.env.REACT_APP_API_URL}/${data.producent}`}
                  alt='sopona'
                />
              </div>
              <div className='tyre-parameter'>
                <h1>{data.name}</h1>
              </div>
              <div className='tyre-parameter'>
                <h3>Rodzaj opony:</h3>
                <p>{data.type}</p>
              </div>
              {data.year !== 0 && (
                <div className='tyre-parameter'>
                  <h3>Rok Produkcji:</h3>
                  <p>{data.year}</p>
                </div>
              )}

              <div className='tyre-parameter'>
                <h3>Przeznaczenie opony:</h3>
                <p>{data.clas}</p>
              </div>
              <div className='tyre-parameter'>
                <h3>Cena:</h3>
                <p>{data.price} zŁ</p>
              </div>

              <div className='desc'>
                <p>{data.description}</p>
              </div>

              <div className='tyre-shadow'></div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};
export default TyreInfo;
