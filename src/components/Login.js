import React, { useReducer, useCallback, useContext } from "react";
import Input from "./Input";
import "./Login.css";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/auth-context";

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
    case "SET_DATA":
      return { ...state, [action.id]: action.value };
    default:
      return state;
  }
};

const Login = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [formState, dispatch] = useReducer(myReducer, {});
  const onInput = useCallback((id, value) => {
    dispatch({
      type: "SET_DATA",
      id,
      value,
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/users/login`,
        "POST",
        JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
        { "Content-Type": "application/json" }
      );
      auth.login(response.id, response.token, response.role);
      console.log(response);
      history.push("/");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <div className='input-fields'>
      <form onSubmit={handleSubmit}>
        <h2>email:</h2>
        <Input id='email' element='text' onInput={onInput}></Input>
        <h2>Haslo:</h2>

        <Input id='password' element='password' onInput={onInput}></Input>
        <div className='btn-div'>
          <button className='btn'>Zaloguj</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
