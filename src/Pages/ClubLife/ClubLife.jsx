import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Editorial from '../../components/Editorial/Editorial';
import ErrorContext from '../../contexts/ErrorContext';
import Error from '../../components/Error/Error';
import './ClubLife.css';

function ClubLife() {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [rules, setRules] = useState('');
  const [missionStatement, setMissionStatement] = useState('');
  const [code, setCode] = useState('');

  const getMissionStatementData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/documents?doc_type=statuts`,
        { withCredentials: true }
      );
      setMissionStatement(resp.data[0].file_name);
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

  const getRulesData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/documents?doc_type=reglement`,
        { withCredentials: true }
      );
      setRules(resp.data[0].file_name);
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

  const getCodeData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/documents?doc_type=code`,
        { withCredentials: true }
      );
      setCode(resp.data[0].file_name);
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

  useEffect(() => {
    getMissionStatementData();
    getRulesData();
    getCodeData();
  }, []);

  return (
    <div>
      <div className="page-title-container">
        <h1 className="page-title">Vie Associative de Notre Club</h1>
      </div>

      <div className="club-life-header">
        <button className="pdf-file-button " type="button">
          <img className="pdf-image" src="./icons/pdf-file.svg" alt="pdf" />
          <a
            href={`${process.env.REACT_APP_API_URL}/documents/${missionStatement}`}
            rel="noreferrer"
            target="_blank"
          >
            Statuts de Perche Plongée
          </a>
        </button>

        <button className="pdf-file-button" type="button">
          <img className="pdf-image" src="./icons/pdf-file.svg" alt="" />
          <a
            href={`${process.env.REACT_APP_API_URL}/documents/${rules}`}
            rel="noreferrer"
            target="_blank"
          >
            Règlement intérieur
          </a>
        </button>

        <button className="pdf-file-button " type="button">
          <img className="pdf-image" src="./icons/pdf-file.svg" alt="folder" />
          <a
            href={`${process.env.REACT_APP_API_URL}/documents/${code}`}
            rel="noreferrer"
            target="_blank"
          >
            Code de bonne conduite
          </a>
        </button>

        <Link to="/archives" className="archive-container">
          <button className="folder-button-archives" type="button">
            <img
              className="folder-image"
              src="./icons/folder.svg"
              alt="pdf-file"
            />
            Archives
          </button>
        </Link>
      </div>

      <Editorial />
      {errorOn && <Error />}
    </div>
  );
}

export default ClubLife;
