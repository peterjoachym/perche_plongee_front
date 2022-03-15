import React, { useContext, useState } from 'react';
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Error from '../../components/Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

function Login({ refreshToken }) {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessage('Veuillez fournir votre email et votre mot de passe');
      setErrorOn(true);
    } else {
      try {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/api/auth/login`,
          { email, password },
          { withCredentials: true }
        );
        // console.log('Login');
        refreshToken();
        navigate('/');
      } catch (err) {
        if (!err.response) {
          setErrorMessage('Le serveur ne fonctionne pas!');
          setErrorOn(true);
        } else {
          setErrorMessage(err.response.data);
          setErrorOn(true);
        }
      }
    }
  };

  return (
    <div className="login-card">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Se connecter</h1>
        <label className="inputs" htmlFor="email">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label className="inputs" htmlFor="password">
          <input
            type="password"
            id="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <div className="buttons">
          <button className="submit" type="submit">
            Se connecter
          </button>
          <Link to="/reset-password">
            <button className="forgot" type="button">
              Mot de passe oublié ?
            </button>
          </Link>
        </div>
      </form>
      {errorOn && <Error />}
    </div>
  );
}

export default Login;
