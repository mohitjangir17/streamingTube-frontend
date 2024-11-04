import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";

export const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (user, accessToken) => {
    setUser(user)
    Cookies.set("authToken", accessToken, { expires: 1 })
    Cookies.set("user", JSON.stringify(user), { expires: 1 })
  };

  const logout = () => {
    axios.post(`${import.meta.env.VITE_API_BASE_URL}/users/logout`, {}, {
      headers:
      {
        Authorization: `${Cookies.get('authToken')}`
      }
    })
      .then((response) => {
        if (response.data.success) {
          setUser(null);
          Cookies.remove("authToken");
          Cookies.remove("user");
        }
      })
      .catch((error) => console.error(error)
      )
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
