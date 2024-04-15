import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children, docCookie }) => {
  console.log(docCookie);
  const cookies = docCookie.split("; ").reduce((prev, current) => {
    const [name, value] = current.split("=");
    prev[name] = value;
    return prev;
  }, {});
  const [user, setUser] = useState(cookies.uid ? { id: 1 } : null);
  useEffect(() => {
    setUser(cookies.uid);
  }, [user]);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};
