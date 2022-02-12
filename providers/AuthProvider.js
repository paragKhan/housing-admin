import React, { createContext, useContext, useEffect, useState } from "react";
import store from "store";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setUser(store.get("user"));
    setToken(store.get("token"));
  }, []);

  const values = { user, token, setUser, setToken };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}
