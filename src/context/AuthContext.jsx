import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [user, setUser] = useState(null);

  // Save tokens to localStorage
  useEffect(() => {
    if (authTokens) {
      localStorage.setItem("authTokens", JSON.stringify(authTokens));
    } else {
      localStorage.removeItem("authTokens");
    }
  }, [authTokens]);

  const loginUser = async (username, password) => {
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const data = await response.json();
      setAuthTokens(data);
      return true;
    } else {
      alert("Login failed!");
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
