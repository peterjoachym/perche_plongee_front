import React, { useContext } from 'react';
import ErrorContext from '../../contexts/ErrorContext';
import './Error.css';

const Error = () => {
  const { errorMessage, setErrorOn, setErrorMessage } =
    useContext(ErrorContext);

  const handleErrorCloseClick = () => {
    setErrorOn(false);
    setErrorMessage('');
  };

  return (
    <div className="error-container">
      <div className="error-message-container">
        <p className="error-message">{errorMessage}</p>
      </div>
      <button
        className="error-close-button"
        type="button"
        onClick={handleErrorCloseClick}
      >
        Fermer
      </button>
    </div>
  );
};

export default Error;
