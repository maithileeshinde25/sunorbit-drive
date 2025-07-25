import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../Services/authService'; 

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userInfo = await authService.getUser();
      setUser(userInfo?.loggedUser || null);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ Optional but recommended: Custom hook to use context
export const useUser = () => useContext(UserContext);
