import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth-context";

const Navs = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className='main-menu'>
      {auth.role === "admin" && (
        <li>
          <NavLink to='/uploadTyre'>Dodaj Produkt</NavLink>
        </li>
      )}
      <li>
        <NavLink to='/'>Strona glowna</NavLink>
      </li>
      <li>
        <NavLink to='/shop'>Oferta</NavLink>
      </li>
      <li>
        <NavLink to='/contactus'>Kontakt</NavLink>
      </li>
    </ul>
  );
};
export default Navs;
