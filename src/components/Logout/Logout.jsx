import React, { useContext } from 'react';
import './Logout.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';
import UserContext from '../../contexts/UserContext';

function Logout() {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const resetToken = async () => {
    try {
      await axios({
        method: 'POST',
        url: `${process.env.REACT_APP_API_URL}/api/auth/logout`,
        withCredentials: true,
      });
    } catch (err) {
      if (!err.response) {
        setErrorMessage('Le serveur ne fonctionne pas!');
        setErrorOn(true);
      } else {
        setErrorMessage(err.response.data);
        setErrorOn(true);
      }
    }
  };

  const handleLogout = async () => {
    await resetToken();
    setUser('guest');
    navigate('/');
  };
  const handleBackNavigation = () => {
    navigate('/');
  };

  return (
    <div className="logout__card">
      <div className="logout__form">
        <h1 className="logout-title">Se deconnecter</h1>
        <div className="button__container">
          <button
            id="back"
            className="submit__logout"
            type="button"
            onClick={handleBackNavigation}
          >
            Retour
          </button>
          <button
            id="logout"
            className="submit__logout"
            type="button"
            onClick={handleLogout}
          >
            Déconnexion
          </button>
        </div>
      </div>
      {errorOn && <Error />}
    </div>
  );
}

export default Logout;
