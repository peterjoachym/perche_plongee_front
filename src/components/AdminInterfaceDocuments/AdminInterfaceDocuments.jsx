import React, { useReducer, useEffect, useContext, useState } from 'react';
import axios from 'axios';
import adminInterfaceDocumentsReducer from '../../reducers/adminInterfaceDocumentsReducer';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';
import FileArchive from '../FileArchive/FileArchive';

import {
  UPDATE_DOCUMENT_ID,
  UPDATE_DOCUMENT_NAME,
  UPDATE_DOCUMENT_TYPE,
  UPDATE_DOCUMENT_DATE,
  RESET_INPUT,
  RESET_DOCUMENT_FILE_INPUT,
  UPDATE_DOCUMENT_FILE,
  UPDATE_CREATED_DOCUMENT,
  UPDATE_CREATE_TOGGLE,
  UPDATE_DELETE_TOGGLE,
  REFRESH_AFTER_UPDATE,
} from '../../actions/adminInterfaceActions.json';

const initialState = {
  documentId: '',
  documentName: '',
  documentType: 'assemblee-ordinaire',
  documentDate: '',
  documentFile: null,
  createdDocument: '',
  createToggleActive: true,
  deleteToggleActive: false,
  refreshUpdate: false,
};

const AdminInterfaceDocuments = () => {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [files, setFiles] = useState([]);
  const [state, dispatch] = useReducer(
    adminInterfaceDocumentsReducer,
    initialState
  );

  // Toggle functions set one of three buttons active

  const handleToggle = () => {
    dispatch({ type: UPDATE_CREATE_TOGGLE });
    dispatch({ type: UPDATE_DELETE_TOGGLE });
  };

  // refresh display after update function

  const refreshDisplayAfterUpdate = () => {
    dispatch({ type: REFRESH_AFTER_UPDATE });
  };

  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    const { type } = selectedFile;
    if (type !== 'application/pdf') {
      setErrorMessage('Veuillez sélectionner un document "PDF" ');
      setErrorOn(true);
      dispatch({ type: RESET_DOCUMENT_FILE_INPUT });
    } else {
      dispatch({ type: UPDATE_DOCUMENT_FILE, payload: e.target.files[0] });
    }
  };

  const getDocumentName = () => {
    const documentName = `${state.documentDate}-${state.documentType}`;
    dispatch({ type: UPDATE_DOCUMENT_NAME, payload: documentName });
  };

  useEffect(() => {
    getDocumentName();
  }, [state.documentDate, state.documentType]);

  const getFilesData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/documents`,
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
  }, [state.refreshUpdate]);

  const createDocument = async () => {
    if (state.documentFile) {
      const { documentName, documentType } = state;
      const data = new FormData();
      data.append('documentFile', state.documentFile);
      data.append(
        'documentData',
        JSON.stringify({ documentName, documentType })
      );
      try {
        const resp = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/documents`,
          data,
          { withCredentials: true }
        );
        dispatch({ type: UPDATE_CREATED_DOCUMENT, payload: resp.data });
        dispatch({ type: RESET_INPUT });
      } catch (err) {
        setErrorMessage(err.response.data);
        setErrorOn(true);
      }
    }
  };

  const deleteDocument = async () => {
    const { documentId } = state;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/documents/${documentId}`
      );
      dispatch({ type: RESET_INPUT });
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.createToggleActive) {
      await createDocument();
    }

    if (state.deleteToggleActive) {
      await deleteDocument();
    }
    refreshDisplayAfterUpdate();
  };

  return (
    <div className="admin-form-container">
      <button
        id="create-document"
        className={
          state.createToggleActive
            ? 'toggle-admin-form-button-on'
            : 'toggle-admin-form-button-off'
        }
        type="button"
        onClick={handleToggle}
      >
        Ajouter un Document
      </button>

      <button
        id="delete-member"
        className={
          state.deleteToggleActive
            ? 'toggle-admin-form-button-on'
            : 'toggle-admin-form-button-off'
        }
        type="button"
        onClick={handleToggle}
      >
        Supprimer un Document
      </button>

      <div className="display-drive-container">
        <h2 className="display-title">Archives</h2>
        <table className="display-members-container">
          <thead>
            <th className="id">Id</th>
            <th className="document-name">Nom du document</th>
            <th className="document-type">Type du document</th>
          </thead>
          <tbody>
            {files.map((file) => (
              <FileArchive key={file.id} {...file} />
            ))}
          </tbody>
        </table>
      </div>
      <form className="document-params" onSubmit={handleSubmit}>
        {!state.createToggleActive && (
          <label htmlFor="documentId">
            Id Document:
            <input
              type="text"
              id="docuementId"
              value={state.documentId}
              onChange={(e) =>
                dispatch({
                  type: UPDATE_DOCUMENT_ID,
                  payload: e.target.value,
                })
              }
            />
          </label>
        )}

        {!state.deleteToggleActive && (
          <label htmlFor="documentType">
            Type de Document Officiel:
            <select
              id="documentType"
              onChange={(e) =>
                dispatch({
                  type: UPDATE_DOCUMENT_TYPE,
                  payload: e.target.value,
                })
              }
              value={state.documentType}
            >
              <option value="assemblee-ordinaire">Assemblé Ordinaire</option>
              <option value="rapport-activite">Rapport Activité</option>
              <option value="comite-directeur">Comité Directeur</option>
              <option value="rapport-moral">Rapport Moral</option>
              <option value="statuts">Status du Club</option>
              <option value="reglement">Réglement intérieur</option>
              <option value="code">Code de Bonne Conduite</option>
            </select>
          </label>
        )}

        {!state.deleteToggleActive && (
          <label htmlFor="documentDate">
            Date de l&apos;événement:
            <input
              type="date"
              id="documentDate"
              value={state.documentDate}
              onChange={(e) =>
                dispatch({
                  type: UPDATE_DOCUMENT_DATE,
                  payload: e.target.value,
                })
              }
            />
          </label>
        )}
        {!state.deleteToggleActive && (
          <label htmlFor="document">
            Ficher:
            <input
              type="file"
              id="document"
              name="document"
              accept="application/pdf"
              onChange={handleChangeFile}
            />
          </label>
        )}
        <button className="submit-button" type="submit">
          Valider
        </button>
      </form>
      {errorOn && <Error />}
    </div>
  );
};

export default AdminInterfaceDocuments;
