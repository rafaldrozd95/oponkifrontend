import React, {
  useReducer,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import Input from "./Input";
import "./OrderForm.css";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../context/auth-context";
import ModalInfo from "./ModalInfo";
import ReCaptcha from "react-google-recaptcha";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const myReducer = (state, action) => {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, [action.id]: action.value };
    default:
      return state;
  }
};
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
const OrderForm = () => {
  const tid = useParams().tid;
  const [success, setSuccess] = useState();
  const [token, setToken] = useState();

  const [data, setData] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [userValid, setUserValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [formState, dispatch] = useReducer(myReducer, {});
  const captchaRef = useRef();
  const onInput = useCallback((id, value) => {
    dispatch({
      type: "SET_VALUE",
      id,
      value,
    });
  }, []);

  useEffect(() => {
    if (data) {
      setTotalPrice(data.price * formState.ile);
    }
  }, [data, formState.ile]);
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
  const handleCaptcha = async (e) => {
    setUserValid(true);
  };
  const MAP = {
    "Płatność z przelewy24": "P24",
    "Kurierska pobraniowa GLS": "Kurierska pobraniowa GLS",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/order/${tid}`,
        "POST",
        JSON.stringify({
          adres: formState.adres,
          city: formState.city,
          dostawa: MAP[formState.dostawa],
          email: formState.email,
          ile: formState.ile,
          phone: formState.phone,
          postal: formState.postal,
          opona: tid,
          imieinazwisko: formState.imieinazwisko,
        }),
        { "Content-Type": "application/json" }
      );
      setSuccess(true);
      setIsLoading(false);
      setToken(data.url);
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };
  return (
    <div className='input-fields'>
      <ModalInfo show={error} onCancel={() => setError(false)}>
        {`${error}`}
      </ModalInfo>
      <ModalInfo
        show={success}
        onCancel={() => {
          setSuccess(false);
          if (token) window.open(token);
          history.push("/");
        }}
      >
        Zamówienie przyjęte do realizacji. Wszystkie szczegóły otrzyma Pan/i na
        podany adres email.{" "}
        {token && (
          <p>Po naciśnięciu OK zostaniesz przeniesiony/a do płatności.</p>
        )}
      </ModalInfo>

      <div>
        <h1>Formularz zamówieniowy</h1>
        <h2>Nazwa opony: </h2>
        {data && <h1>{data.name}</h1>}
        {data && (
          <img
            src={`${process.env.REACT_APP_API_URL}/${data.imageCover}`}
            alt='obrazek'
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Rodzaj przesyłki</h2>
        <Input
          id='dostawa'
          element='select'
          options={["Kurierska pobraniowa GLS", "Płatność z przelewy24"]}
          onInput={onInput}
        />
        <h2>Ilość sztuk</h2>
        <Input
          id='ile'
          element='select'
          options={["1", "2", "4", "6", "8"]}
          onInput={onInput}
        />
        <h2>Imie i nazwisko</h2>
        <Input id='imieinazwisko' element='text' rows='5' onInput={onInput} />
        <h2>Dane adresowe</h2>
        <Input id='adres' element='text' rows='5' onInput={onInput} />
        <h2>Kod pocztowy</h2>
        <Input id='postal' element='text' rows='5' onInput={onInput} />
        <h2>Miasto</h2>
        <Input id='city' element='text' rows='5' onInput={onInput} />
        <h2>Adres email</h2>
        <Input id='email' element='text' onInput={onInput} />
        <h2>Telefon kontaktowy</h2>
        <Input id='phone' element='text' onInput={onInput} />

        <h2>Koszt zamówienia: </h2>
        {formState.ile && <h3> {totalPrice}.00 PLN</h3>}
        <ReCaptcha
          ref={captchaRef}
          sitekey='6LcpFv4UAAAAAM0rBSDP5nBwswSbu74WOxmobQf_'
          onChange={handleCaptcha}
          hl='pl'
        />
        {isLoading && <AiOutlineLoading3Quarters className='spinner' />}
        <div className='btn-div'>
          <button className='btn'>Złóż zamówienie</button>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
