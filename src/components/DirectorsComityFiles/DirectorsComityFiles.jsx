import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ErrorContext from '../../contexts/ErrorContext';
import Error from '../Error/Error';
import File from '../File/File';

const DirectorsComityFiles = () => {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [files, setFiles] = useState([]);

  const getFilesData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/documents?doc_type=comite-directeur`,
        { withCredentials: true }
      );
      setFiles(resp.data);
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
    getFilesData();
  }, []);

  return (
    <div className="archives-container">
      <div className="archive-file-display">
        {files.map((file) => (
          <File key={file.id} {...file} />
        ))}
      </div>
      <Link to="/archives">
        <button className="submit-button" type="button">
          Retour
        </button>
      </Link>
      {errorOn && <Error />}
    </div>
  );
};

export default DirectorsComityFiles;
