import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";
import NavBar from "./components/navigation/NavBar";
import HomePage from "./components/HomePage";
import Shop from "./components/Shop";
import UploadTyre from "./components/UploadTyre";
import Footer from "./components/Footer";
import TyreInfo from "./components/TyreInfo";
import Login from "./components/Login";
import AuthContext from "./context/auth-context";
import UpdateTyre from "./components/UpdateTyre";
import Contatct from "./components/Contact";
import OrderForm from "./components/OrderForm";
import ShowOrders from "./components/ShowOrders";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Rules from "./components/Rules";
import ModalInfo from "./components/ModalInfo";

const App = () => {
  const [cookies, setCookies] = useState(false);
  const [token, setToken] = useState();
  const [userId, setUserId] = useState();
  const [role, setRole] = useState();

  const login = useCallback((uid, token, role) => {
    setToken(token);
    setUserId(uid);
    setRole(role);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        role: role,
      })
    );
  }, []);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token, storedData.role);
    }
  }, [login]);
  useEffect(() => {
    const cookie = JSON.parse(localStorage.getItem("userData"));

    if (cookie && cookie.cookies) {
      setCookies(false);
    } else {
      setCookies(true);
    }
  }, []);
  const logout = useCallback((uid, token) => {
    setToken(null);
    setUserId(null);
    setRole(null);
  }, []);
  return (
    <React.Fragment>
      <div className='container'>
        <AuthContext.Provider
          value={{ login, logout, token, role, userId, isLogged: !!token }}
        >
          <Router>
            <ModalInfo
              show={cookies}
              onCancel={() => {
                setCookies(false);
                localStorage.setItem(
                  "userData",
                  JSON.stringify({
                    cookies,
                  })
                );
              }}
            >
              <div className='polityka'>
                <h1>
                  Witryna www.oponydrozd.com używa plików cookies aby zapewnić
                  użytkownikom wygodę korzystania z naszej witryny. Kontynuując
                  korzystanie z naszej strony, zgadzasz się na korzystanie z
                  plików cookie.
                </h1>
                <Link to='/privacyPolicy'>Polityka Prywatności</Link>
              </div>
            </ModalInfo>
            <nav>
              <NavBar />
            </nav>
            <Switch>
              <Route path='/' exact>
                <HomePage />
              </Route>
              <Route path='/shop' exact>
                <Shop />
              </Route>
              <Route path='/uploadTyre' exact>
                <UploadTyre />
              </Route>
              <Route path='/showOrders' exact>
                <ShowOrders />
              </Route>
              <Route path='/login' exact>
                <Login />
              </Route>
              <Route path='/contactus' exact>
                <Contatct />
              </Route>
              <Route path='/garage' exact></Route>
              <Route path='/tyres/:tid' exact>
                <TyreInfo />
              </Route>
              <Route path='/order/:tid' exact>
                <OrderForm />
              </Route>
              <Route path='/tyres/update/:tid' exact>
                <UpdateTyre />
              </Route>
              <Route path='/privacyPolicy'>
                <PrivacyPolicy />
              </Route>
              <Route path='/rules'>
                <Rules />
              </Route>

              <Redirect to='/' />
            </Switch>
            <Footer />
          </Router>
        </AuthContext.Provider>
      </div>
    </React.Fragment>
  );
};

export default App;
