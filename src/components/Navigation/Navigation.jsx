import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import './Navigation.css';

function Navigation() {
  const { user } = useContext(UserContext);
  const [showLinks, setShowLinks] = useState(false);

  let buttonText = 'SE CONNECTER';
  if (user.role === 1 || user.role === 0) {
    buttonText = `Bonjour ${user.firstname.toUpperCase()}`;
  }

  const handleShowLinks = () => {
    setShowLinks(!showLinks);
  };

  return (
    <nav className={`navbar ${showLinks ? 'show-nav' : 'hide-nav'}`}>
      <div className="navbar-logo">
        <img src="./logo-perche-plongee.png" alt="Logo" />
      </div>
      <ul className="navbar-links">
        <li className="navbar-item">
          <Link to="/" className="navbar-link" onClick={handleShowLinks}>
            ACCUEIL
          </Link>
        </li>
        {(user.role === 1 || user.role === 0) && (
          <li className="navbar-item">
            <Link
              to="/vie-associative"
              className="navbar-link"
              onClick={handleShowLinks}
            >
              VIE ASSOCIATIVE
            </Link>
          </li>
        )}
        {(user.role === 1 || user.role === 0) && (
          <li className="navbar-item">
            <Link
              to="/annuaire"
              className="navbar-link"
              onClick={handleShowLinks}
            >
              ANNUAIRE
            </Link>
          </li>
        )}
        <li className="navbar-item">
          <Link
            to="/evenements"
            className="navbar-link"
            onClick={handleShowLinks}
          >
            ÉVÉNEMENTS
          </Link>
        </li>
        <li className="navbar-item">
          <Link
            to="/formations"
            className="navbar-link"
            onClick={handleShowLinks}
          >
            FORMATIONS
          </Link>
        </li>
        {/* <li className="navbar-item">
          <Link
            to="/inscription"
            className="navbar-link"
            onClick={handleShowLinks}
          >
            INSCRIPTION
          </Link>
        </li> */}
        {user.role === 1 && (
          <li className="navbar-item">
            <Link to="/admin" className="navbar-link" onClick={handleShowLinks}>
              ADMINISTRATION
            </Link>
          </li>
        )}
        <button type="button" className="navbar-button">
          <Link
            to={user.role === 1 || user.role === 0 ? '/deconnect' : '/login'}
            className="navbar-link-button"
            onClick={handleShowLinks}
          >
            {buttonText}
          </Link>
        </button>
      </ul>
      <button className="navbar-burger" type="button" onClick={handleShowLinks}>
        <span className="burger-bar" />
      </button>
    </nav>
  );
}

export default Navigation;
