import React, { useState, useCallback, useEffect } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
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

const App = () => {
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
  const logout = useCallback((uid, token) => {
    setToken(null);
    setUserId(null);
    setRole(null);
  }, []);
  return (
    <div className='container'>
      <AuthContext.Provider
        value={{ login, logout, token, role, userId, isLogged: !!token }}
      >
        <Router>
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

            <Redirect to='/' />
          </Switch>
          <Footer />
        </Router>
      </AuthContext.Provider>
    </div>
  );
};

export default App;
