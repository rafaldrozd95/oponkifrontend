import React from "react";

const AuthContext = React.createContext({
  isLogged: false,
  isAdmin: false,
  setIsLogin: () => {},
  setLogOut: () => {},
});

export default AuthContext;
