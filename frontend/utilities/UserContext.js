// UserContext.js
import React, { createContext, useState } from 'react';

export const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Store user data and login state

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
