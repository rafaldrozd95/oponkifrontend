import React from "react";
import "./Footer.css";
import { AiFillPhone, AiFillFacebook } from "react-icons/ai";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className='footer'>
      <div>
        <p>Opony JAND</p>
      </div>
      <ul>
        <li>
          <a target='_blank' href='https://www.facebook.com/JANDJanDrozd/'>
            <AiFillFacebook size='2.5rem' color='black' />
          </a>
        </li>
        <li>
          <Link to='/contactus'>
            <AiFillPhone size='2.5rem' color='black' />
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Footer;
