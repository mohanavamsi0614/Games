import React, { createContext, useContext, useState, useEffect } from "react";
import GoogleSignIn from "./firebase";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = sessionStorage.getItem('user');
      if (stored) setUser(JSON.parse(stored));
    } catch (err) {
      console.error('Failed to read user from sessionStorage', err);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {user ? children : <GoogleSignIn setUser={setUser} />}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
