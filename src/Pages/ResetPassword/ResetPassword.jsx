import React, { useState, useContext } from 'react';
import './ResetPassword.css';
import axios from 'axios';
import Error from '../../components/Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const ResetPassword = () => {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [email, setEmail] = useState('');

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/reset-password`,
        { email },
        { withCredentials: true }
      );
      setErrorMessage('Le mail à été envoyé à votre adresse email!');
      setErrorOn(true);
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
    setEmail('');
  };

  return (
    <div className="login-card">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Demande la réinitialisation</h1>
        <label htmlFor="email" className="inputs">
          <input
            type="email"
            id="email"
            placeholder="Entrez email de votre compte PerchePlongée"
            value={email}
            onChange={handleEmail}
          />
        </label>
        <div className="buttons">
          <button className="submit" type="submit">
            Envoyer la demande
          </button>
        </div>
      </form>
      {errorOn && <Error />}
    </div>
  );
};

export default ResetPassword;
