import React, { createContext, useState } from 'react';

const ErrorContext = createContext();

export const ErrorContextProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [errorOn, setErrorOn] = useState(false);

  return (
    <ErrorContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        errorOn,
        setErrorOn,
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorContext;
