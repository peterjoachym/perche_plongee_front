import React, { createContext, useState } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState('guest');
  const [refreshTokenRef, setRefreshTokenRef] = useState(null);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        refreshTokenRef,
        setRefreshTokenRef,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
