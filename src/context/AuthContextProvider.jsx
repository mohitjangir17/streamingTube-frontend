import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = React.createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  // const navigate = useNavigate()

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set the user from the stored cookie if it exists
    }
  }, []);

  // Login function (to be called after successful authentication)
  const login = (user, accessToken) => {
    setUser(user);
    Cookies.set("authToken", accessToken, { expires: 7 }); // Store token in cookies for 7 days
    Cookies.set("user", JSON.stringify(user), { expires: 7 }); // Store user data in cookies
  };

  // Logout function (to be called when the user logs out)
  const logout = () => {
    setUser(null);
    Cookies.remove("authToken"); // Remove token from cookies
    Cookies.remove("user"); // Remove user data from cookies
  };


  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
