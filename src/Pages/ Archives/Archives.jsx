import React from 'react';
import { Link } from 'react-router-dom';
import './Archives.css';

const Archives = () => {
  return (
    <div className="archives-container">
      <div className="archive-folder-display">
        <Link to="/archives/assembly-drive">
          <button className="folder-button" type="button">
            <img
              className="folder-image"
              src="./icons/folder.svg"
              alt="pdf-file"
            />
            Assemblées Ordinaires
          </button>
        </Link>
        <Link to="/archives/activity-drive">
          <button className="folder-button" type="button">
            <img
              className="folder-image"
              src="./icons/folder.svg"
              alt="pdf-file"
            />
            Rapports Activité
          </button>
        </Link>
        <Link to="/archives/director-drive">
          <button className="folder-button" type="button">
            <img
              className="folder-image"
              src="./icons/folder.svg"
              alt="pdf-file"
            />
            Comités Directeur
          </button>
        </Link>
        <Link to="/archives/president-drive">
          <button className="folder-button" type="button">
            <img
              className="folder-image"
              src="./icons/folder.svg"
              alt="pdf-file"
            />
            Rapports Moraux
          </button>
        </Link>
      </div>
      <Link to="/vie-associative">
        <button className="submit-button" type="button">
          Retour
        </button>
      </Link>
    </div>
  );
};

export default Archives;
