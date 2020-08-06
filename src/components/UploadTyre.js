import React, { useReducer, useCallback, useContext, useState } from "react";
import Input from "./Input";
import "./UploadTyre.css";
import ImageInput from "./ImageInput";
import { useHistory } from "react-router-dom";
import AuthContext from "../context/auth-context";
import ModalInfo from "./ModalInfo";

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
const UploadTyre = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const [error, setError] = useState(false);
  const [formState, dispatch] = useReducer(myReducer, {});
  const onInput = useCallback((id, value) => {
    dispatch({
      type: "SET_VALUE",
      id,
      value,
    });
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const PRODUCENT_MAP = {
      Torque: "5f2a5eb156f94e217cfd2bc6",
      Equipe: "5f2a5e9a56f94e217cfd2bc4",
      GtRadial: "5f2a5ea856f94e217cfd2bc5",
      Rotalla: "5f2a5e8f56f94e217cfd2bc3",
    };
    console.log(formState);

    try {
      setError(false);
      const formData = new FormData();
      if (!!formState.imageCover === false) {
        throw new Error("Nie zamieszczono zdjecia  okladki");
      }
      if (!!formState.image === false) {
        throw new Error("Nie zamieszczono zdjec");
      }
      if (formState.image.length > 4) {
        throw new Error("Za duzo zdjec");
      }
      formData.append("indeks", formState.indeks);
      formData.append("producent", PRODUCENT_MAP[formState.producent]);
      formData.append("clas", formState.clas);
      formData.append("description", formState.description);
      formData.append("imageCover", formState.imageCover[0]);
      formData.append("producent", formState.producent[0]);

      for (let i = 0; i < formState.image["length"]; i++) {
        formData.append("image", formState.image[i]);
      }
      formData.append("name", formState.name);
      formData.append("price", formState.price);
      formData.append("profil", formState.profil);
      formData.append("sezon", formState.sezon);
      formData.append("srednica", formState.srednica);
      formData.append("szerokosc", formState.szerokosc);
      formData.append("type", formState.type);
      formData.append("year", formState.year);

      const responseData = await sendRequest(
        `${process.env.REACT_APP_API_URL}/api/tyres`,
        "POST",
        formData,
        { authorization: `Bearer ${auth.token}` }
      );
      history.push("/");
    } catch (err) {
      setError(err);
    }
  };
  return (
    <div className='input-fields'>
      <ModalInfo show={error} onCancel={() => setError(false)}>
        {`${error}`}
      </ModalInfo>
      <form onSubmit={handleSubmit}>
        <label>
          <h2>Nazwa opony</h2>
        </label>
        <Input id='name' element='text' onInput={onInput} />
        <h2>Typ opony</h2>
        <Input
          id='type'
          element='select'
          options={["nowa", "bieznikowana"]}
          onInput={onInput}
        />

        <h2>Rodzaj opony</h2>
        <Input
          id='clas'
          element='select'
          options={["terenowa", "wzmacniana", "samochodowa"]}
          onInput={onInput}
        />
        <h2>Sezon</h2>
        <Input
          id='sezon'
          element='select'
          options={["lato", "zima", "allseason"]}
          onInput={onInput}
        />
        <h2>Średnica Opony</h2>
        <Input
          id='srednica'
          element='select'
          options={["13", "14", "15", "16", "17"]}
          onInput={onInput}
        />

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

        <h2>Profil Opony</h2>
        <Input
          id='profil'
          element='select'
          options={[
            "10.5",
            "12.5",
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

        <h2>Indeks Prędkości</h2>
        <Input
          id='indeks'
          element='select'
          options={[
            "brak",
            "U - 200 km/h",
            "H - 210 km/h",
            "V - 240 km/h",
            "W - 270 km/h",
            "Y - 300 km/h",
          ]}
          onInput={onInput}
        />
        <h2>Producent</h2>
        <Input
          id='producent'
          element='select'
          options={["Equipe", "Torque", "GtRadial", "Rotalla"]}
          onInput={onInput}
        />
        <h2>Rok produkcji</h2>
        <Input id='year' element='text' onInput={onInput} />
        <h2>Cena</h2>
        <Input id='price' element='text' onInput={onInput} />
        <h2>Opis</h2>

        <Input id='description' element='textarea' onInput={onInput} />
        <h2>Zdjecia</h2>

        <ImageInput id='image' namiusz='Dodaj zdjecia' onInput={onInput} />
        <h2>Okladka</h2>

        <ImageInput namiusz='Dodaj okladke' id='imageCover' onInput={onInput} />

        <div className='btn-div'>
          <button className='btn'>Dodaj opone</button>
        </div>
      </form>
    </div>
  );
};

export default UploadTyre;

