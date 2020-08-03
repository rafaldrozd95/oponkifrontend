import React, {
  useReducer,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react";
import Input from "./Input";
import "./UpdateTyre.css";
import { useHistory, useParams } from "react-router-dom";
import AuthContext from "../context/auth-context";

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
const UpdateTyre = () => {
  const tid = useParams().tid;
  const history = useHistory();
  const [loadedTyre, setLoadedTyre] = useState();
  const auth = useContext(AuthContext);
  const [formState, dispatch] = useReducer(myReducer, {
    name: "",
    type: "nowa",
    size: "14",
    clas: "samochodowa",
  });
  useEffect(() => {
    const func = async () => {
      try {
        const response = await sendRequest(
          `${process.env.REACT_APP_API_URL}/api/tyres/${tid}`
        );
        setLoadedTyre(response.tyre);
        console.log(response.tyre);
      } catch (err) {
        alert(err);
      }
    };
    func();
  }, [tid]);
  const onInput = useCallback((id, value) => {
    dispatch({
      type: "SET_VALUE",
      id,
      value,
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/tyres/${tid}`,
        "PATCH",
        JSON.stringify({
          name: formState.name,
          description: formState.description,
          price: formState.price,
          year: formState.year,
        }),
        {
          authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      history.push("/");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className='input-fields'>
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Nazwa opony</h2>
        </label>
        <Input
          id='name'
          def={loadedTyre ? loadedTyre.name : ""}
          element='text'
          onInput={onInput}
        />
        <h2>Cena</h2>

        <Input
          id='price'
          def={loadedTyre ? loadedTyre.price : ""}
          element='text'
          onInput={onInput}
        />
        <h2>Rok produkcji</h2>

        <Input
          id='year'
          def={loadedTyre ? loadedTyre.year : ""}
          element='text'
          onInput={onInput}
        />
        <h2>Opis</h2>
        <Input
          id='description'
          element='textarea'
          def={loadedTyre ? loadedTyre.description : ""}
          onInput={onInput}
        />
        <div className='btn-div'>
          <button className='btn'>Zaktualizuj</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTyre;

