import React, { useReducer } from 'react';
import adminInterfaceReducer from '../../reducers/adminInterfaceReducer';
import AdminInterfaceMembers from '../../components/AdminInterfaceMembers/AdminInterfaceMembers';
import AdminInterfaceEvents from '../../components/AdminInterfaceEvents/AdminInterfaceEvents';
import AdminInterfaceTraining from '../../components/AdminInterfaceTraining/AdminInterfaceTraining';
import AdminInterfaceArticle from '../../components/AdminInterfaceArticle/AdminInterfaceArticle';
import AdminInterfaceDocuments from '../../components/AdminInterfaceDocuments/AdminInterfaceDocuments';
import './AdminPage.css';

import {
  UPDATE_INTERFACE_MEMBERS,
  UPDATE_INTERFACE_EVENTS,
  UPDATE_INTERFACE_TRAININGS,
  UPDATE_INTERFACE_ARTICLE,
  UPDATE_INTERFACE_DOCUMENTS,
} from '../../actions/adminInterfaceActions.json';

const initialState = {
  interfaceEventsActive: true,
  interfaceMembersActive: false,
  interfaceTrainingsActive: false,
  interfaceArticleActive: false,
  interfaceDocumentsActive: false,
};

const AdminPage = () => {
  const [state, dispatch] = useReducer(adminInterfaceReducer, initialState);

  const handleMembersToggle = () => {
    if (!state.interfaceMembersActive) {
      dispatch({ type: UPDATE_INTERFACE_MEMBERS });
      if (state.interfaceEventsActive) {
        dispatch({ type: UPDATE_INTERFACE_EVENTS });
      }
      if (state.interfaceTrainingsActive) {
        dispatch({ type: UPDATE_INTERFACE_TRAININGS });
      }
      if (state.interfaceArticleActive) {
        dispatch({ type: UPDATE_INTERFACE_ARTICLE });
      }
      if (state.interfaceDocumentsActive) {
        dispatch({ type: UPDATE_INTERFACE_DOCUMENTS });
      }
    }
  };

  const handleEventsToggle = () => {
    if (!state.interfaceEventsActive) {
      dispatch({ type: UPDATE_INTERFACE_EVENTS });
      if (state.interfaceMembersActive) {
        dispatch({ type: UPDATE_INTERFACE_MEMBERS });
      }
      if (state.interfaceTrainingsActive) {
        dispatch({ type: UPDATE_INTERFACE_TRAININGS });
      }
      if (state.interfaceArticleActive) {
        dispatch({ type: UPDATE_INTERFACE_ARTICLE });
      }
      if (state.interfaceDocumentsActive) {
        dispatch({ type: UPDATE_INTERFACE_DOCUMENTS });
      }
    }
  };

  const handleTrainingsToggle = () => {
    if (!state.interfaceTrainingsActive) {
      dispatch({ type: UPDATE_INTERFACE_TRAININGS });
      if (state.interfaceEventsActive) {
        dispatch({ type: UPDATE_INTERFACE_EVENTS });
      }
      if (state.interfaceMembersActive) {
        dispatch({ type: UPDATE_INTERFACE_MEMBERS });
      }
      if (state.interfaceArticleActive) {
        dispatch({ type: UPDATE_INTERFACE_ARTICLE });
      }
      if (state.interfaceDocumentsActive) {
        dispatch({ type: UPDATE_INTERFACE_DOCUMENTS });
      }
    }
  };

  const handleArticleToggle = () => {
    if (!state.interfaceArticleActive) {
      dispatch({ type: UPDATE_INTERFACE_ARTICLE });
      if (state.interfaceEventsActive) {
        dispatch({ type: UPDATE_INTERFACE_EVENTS });
      }
      if (state.interfaceMembersActive) {
        dispatch({ type: UPDATE_INTERFACE_MEMBERS });
      }
      if (state.interfaceTrainingsActive) {
        dispatch({ type: UPDATE_INTERFACE_TRAININGS });
      }
      if (state.interfaceDocumentsActive) {
        dispatch({ type: UPDATE_INTERFACE_DOCUMENTS });
      }
    }
  };

  const handleDocumentsToggle = () => {
    if (!state.interfaceDocumentsActive) {
      dispatch({ type: UPDATE_INTERFACE_DOCUMENTS });
      if (state.interfaceEventsActive) {
        dispatch({ type: UPDATE_INTERFACE_EVENTS });
      }
      if (state.interfaceMembersActive) {
        dispatch({ type: UPDATE_INTERFACE_MEMBERS });
      }
      if (state.interfaceTrainingsActive) {
        dispatch({ type: UPDATE_INTERFACE_TRAININGS });
      }
      if (state.interfaceArticleActive) {
        dispatch({ type: UPDATE_INTERFACE_ARTICLE });
      }
    }
  };

  return (
    <div className="admin-page">
      <div className="page-title-container">
        <h1 className="page-title">Administration</h1>
      </div>

      <div className="admin-container">
        <button
          type="button"
          onClick={handleEventsToggle}
          className={
            state.interfaceEventsActive
              ? 'toggle-admin-form-button-on'
              : 'toggle-admin-form-button-off'
          }
        >
          EVENEMENTS
        </button>

        <button
          type="button"
          onClick={handleMembersToggle}
          className={
            state.interfaceMembersActive
              ? 'toggle-admin-form-button-on'
              : 'toggle-admin-form-button-off'
          }
        >
          MEMBRES
        </button>

        <button
          type="button"
          onClick={handleTrainingsToggle}
          className={
            state.interfaceTrainingsActive
              ? 'toggle-admin-form-button-on'
              : 'toggle-admin-form-button-off'
          }
        >
          FORMATIONS
        </button>

        <button
          type="button"
          onClick={handleArticleToggle}
          className={
            state.interfaceArticleActive
              ? 'toggle-admin-form-button-on'
              : 'toggle-admin-form-button-off'
          }
        >
          MOTS DU PRESIDENT
        </button>

        <button
          type="button"
          onClick={handleDocumentsToggle}
          className={
            state.interfaceDocumentsActive
              ? 'toggle-admin-form-button-on'
              : 'toggle-admin-form-button-off'
          }
        >
          ARCHIVES
        </button>

        {state.interfaceMembersActive && <AdminInterfaceMembers />}
        {state.interfaceEventsActive && <AdminInterfaceEvents />}
        {state.interfaceTrainingsActive && <AdminInterfaceTraining />}
        {state.interfaceArticleActive && <AdminInterfaceArticle />}
        {state.interfaceDocumentsActive && <AdminInterfaceDocuments />}
      </div>
    </div>
  );
};

export default AdminPage;
