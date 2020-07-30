import React, { useRef, useEffect } from "react";
import { AiFillPhone, AiFillMail } from "react-icons/ai";
import "./Contact.css";
const Contact = () => {
  const mapRef = useRef();
  const uluru = { lat: 50.080622, lng: 21.676142 };
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: uluru,
      zoom: 16,
    });
    new window.google.maps.Marker({ position: uluru, map: map });
  }, [uluru]);

  return (
    <div className='contact-content'>
      <h1>Dane kontaktowe:</h1>
      <div className='pair'>
        <AiFillPhone color='orange' size='4rem' />
        <div>
          <p>889 622 666</p>
          <p>605 480 255</p>
        </div>
      </div>
      <div className='pair'>
        <AiFillMail color='orange' size='4rem' />
        <div>
          <p>oponybieznik@gmail.com</p>
        </div>
      </div>
      <h1>Jak dojechać?</h1>
      <div ref={mapRef} className={`map`}></div>
    </div>
  );
};

export default Contact;
