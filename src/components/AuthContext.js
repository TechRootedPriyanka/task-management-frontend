// import React, { createContext, useState } from 'react';
// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);

//   const login = (newToken) => {
//     setToken(newToken);
//   };

//   const logout = () => {
//     setToken(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const logout = () => {
    setToken(null);
    localStorage.setItem('token', "");
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      <p>{token}</p>
      {children}
    </AuthContext.Provider>
  );
};

