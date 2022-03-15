import React, { useState, useContext } from 'react';
import './AccountActivate.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Error from '../../components/Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const AccountActivate = () => {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const { token } = useParams();
  const navigate = useNavigate();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrorMessage('Les mots de passe ne sont pas identiques!');
      setErrorOn(true);
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/activate/${token}`,
          { password }
        );
        navigate('/login');
      } catch (err) {
        setErrorMessage(err.response.data);
        setErrorOn(true);
      }
    }
    setPassword('');
    setRepeatPassword('');
  };

  return (
    <div className="login-card">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Activez votre compte</h1>
        <label htmlFor="Password" className="inputs">
          <input
            type="password"
            id="password"
            placeholder="Entrez votre nouveau mot de passe"
            value={password}
            onChange={handlePassword}
          />
        </label>
        <label htmlFor="repeat-password" className="inputs">
          <input
            type="password"
            id="repeat-password"
            placeholder=" Re-rentrez le mot de passe"
            value={repeatPassword}
            onChange={handleRepeatPassword}
          />
        </label>
        <div className="buttons">
          <button className="submit" type="submit">
            Activer le compte
          </button>
        </div>
      </form>
      {errorOn && <Error />}
    </div>
  );
};

export default AccountActivate;
