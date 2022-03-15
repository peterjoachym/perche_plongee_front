import axios from 'axios';
import React, { useEffect, useReducer, useContext } from 'react';
import adminInterfaceReducer from '../../reducers/adminInterfaceMembersReducer';
import Member from '../Member/Member';
import './AdminInterfaceMembers.css';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

import {
  UPDATE_MEMBERS,
  UPDATE_CREATE_TOGGLE,
  UPDATE_UPDATE_TOGGLE,
  UPDATE_DELETE_TOGGLE,
  UPDATE_MEMBER_ID,
  UPDATE_WEB_ADMIN,
  UPDATE_LAST_NAME,
  UPDATE_FIRST_NAME,
  UPDATE_EMAIL,
  UPDATE_PHONE_NUMBER,
  UPDATE_CLUB_ROLE,
  UPDATE_DESCRIPTION,
  UPDATE_CREATED_USER,
  UPDATE_AVATAR_FILE,
  UPDATE_CREATED_AVATAR,
  RESET_INPUT,
  RESET_FILE_INPUT,
  REFRESH_AFTER_UPDATE,
} from '../../actions/adminInterfaceActions.json';

const initialState = {
  members: [],
  memberId: '',
  lastName: '',
  firstName: '',
  email: '',
  phoneNumber: '',
  clubRole: 'membre',
  description: '',
  isPublic: false,
  isPoster: false,
  avatarFile: '',
  createdAvatar: '',
  websiteAdmin: '0',
  createdUser: '',
  createToggleActive: true,
  updateToggleActive: false,
  deleteToggleActive: false,
  refreshUpdate: false,
};

const AdminInterfaceMembers = () => {
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [state, dispatch] = useReducer(adminInterfaceReducer, initialState);
  const { members } = state;

  // Toggle functions set one of three buttons active

  const handleCreateToggle = () => {
    if (!state.createToggleActive) {
      dispatch({ type: UPDATE_CREATE_TOGGLE });
      if (state.updateToggleActive) {
        dispatch({ type: UPDATE_UPDATE_TOGGLE });
      }
      if (state.deleteToggleActive) {
        dispatch({ type: UPDATE_DELETE_TOGGLE });
      }
    }
  };

  const handleUpdateToggle = () => {
    if (!state.updateToggleActive) {
      dispatch({ type: UPDATE_UPDATE_TOGGLE });
      if (state.createToggleActive) {
        dispatch({ type: UPDATE_CREATE_TOGGLE });
      }
      if (state.deleteToggleActive) {
        dispatch({ type: UPDATE_DELETE_TOGGLE });
      }
    }
  };

  const handleDeleteToggle = () => {
    if (!state.deleteToggleActive) {
      dispatch({ type: UPDATE_DELETE_TOGGLE });
      if (state.createToggleActive) {
        dispatch({ type: UPDATE_CREATE_TOGGLE });
      }
      if (state.updateToggleActive) {
        dispatch({ type: UPDATE_UPDATE_TOGGLE });
      }
    }
  };

  // refresh display after update function

  const refreshDisplayAfterUpdate = () => {
    dispatch({ type: REFRESH_AFTER_UPDATE });
  };

  // functions containing different AXIOS REQUEST

  const getMembres = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users`,
        { withCredentials: true }
      );
      dispatch({ type: UPDATE_MEMBERS, payload: resp.data });
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
    getMembres();
  }, [state.refreshUpdate]);

  const createMember = async () => {
    try {
      const resp = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users`,
        {
          lastname: `${state.lastName}`,
          firstname: `${state.firstName}`,
          email: `${state.email}`,
          tel_number: `${state.phoneNumber}`,
          club_role: `${state.clubRole}`,
          website_admin: `${state.websiteAdmin}`,
        },
        { withCredentials: true }
      );
      dispatch({ type: UPDATE_CREATED_USER, payload: resp.data });
      return resp.data.id;
    } catch (err) {
      if (!err.response) {
        setErrorMessage('Le serveur ne fonctionne pas!');
        setErrorOn(true);
      } else {
        setErrorMessage(err.response.data);
        setErrorOn(true);
      }
      return null;
    }
  };

  const createAvatar = async (id) => {
    if (state.avatarFile) {
      const { description, isPublic, isPoster } = state;
      const data = new FormData();
      data.append('avatarFile', state.avatarFile);
      data.append(
        'avatarData',
        JSON.stringify({ description, isPublic, isPoster, userId: id })
      );
      try {
        const resp = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/pictures/avatars`,
          data,
          { withCredentials: true }
        );
        dispatch({ type: UPDATE_CREATED_AVATAR, payload: resp.data });
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

  const updateMember = async () => {
    const { memberId } = state;
    try {
      const resp = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/users/${memberId}`,
        {
          lastname: `${state.lastName}`,
          firstname: `${state.firstName}`,
          email: `${state.email}`,
          tel_number: `${state.phoneNumber}`,
          club_role: `${state.clubRole}`,
          website_admin: `${state.websiteAdmin}`,
        },
        { withCredentials: true }
      );
      dispatch({ type: UPDATE_CREATED_USER, payload: resp.data });
      return resp.data.id;
    } catch (err) {
      if (!err.response) {
        setErrorMessage('Le serveur ne fonctionne pas!');
        setErrorOn(true);
      } else {
        setErrorMessage(err.response.data);
        setErrorOn(true);
      }
      return null;
    }
  };

  const updateAvatar = async () => {
    if (state.avatarFile) {
      const { memberId, description, isPublic, isPoster } = state;
      const data = new FormData();
      data.append('avatarFile', state.avatarFile);
      data.append(
        'avatarData',
        JSON.stringify({ description, isPublic, isPoster, userId: memberId })
      );
      try {
        const resp = await axios.put(
          `${process.env.REACT_APP_API_URL}/api/pictures/avatars/${memberId}`,
          data,
          { withCredentials: true }
        );
        dispatch({ type: UPDATE_CREATED_AVATAR, payload: resp.data });
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

  const deleteMember = async () => {
    const { memberId } = state;
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/users/${memberId}`
      );
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

  // submit function call different request function in order to state activated by CREATE/UPDATE/DELETE toggle
  const handleSubmit = async (e) => {
    e.preventDefault();

    // axios request to create user with or without avatar
    if (state.createToggleActive) {
      const id = await createMember();
      await createAvatar(id);
    }

    // axios request to update user  or avatar
    if (state.updateToggleActive) {
      const id = await updateMember();
      await updateAvatar(id);
    }

    // axios request to delete user
    if (state.deleteToggleActive) {
      await deleteMember();
    }
    refreshDisplayAfterUpdate();
    dispatch({ type: RESET_INPUT });
  };

  // update file state function with controlling the format of file to upload
  const handleChangeFile = (e) => {
    const selectedFile = e.target.files[0];
    const { type } = selectedFile;
    if (type !== 'image/png' && type !== 'image/jpg' && type !== 'image/jpeg') {
      setErrorMessage('Veuillez sélectionner une image .png, .jpg ou .jpeg');
      setErrorOn(true);
      dispatch({ type: RESET_FILE_INPUT });
    } else {
      dispatch({ type: UPDATE_AVATAR_FILE, payload: e.target.files[0] });
    }
  };

  // Function composing description for the uploaded file in format (lastName_firstName_id_photo)
  const getDescription = () => {
    const description = `${state.lastName.toLowerCase()}_${state.firstName.toLowerCase()}_id_photo`;
    dispatch({ type: UPDATE_DESCRIPTION, payload: description });
  };

  useEffect(() => {
    getDescription();
  }, [state.lastName, state.firstName]);

  return (
    <div className="admin-form-container">
      <button
        id="create-member"
        className={
          state.createToggleActive
            ? 'toggle-admin-form-button-on'
            : 'toggle-admin-form-button-off'
        }
        type="button"
        onClick={handleCreateToggle}
      >
        Créer un Membre
      </button>
      <button
        id="update-member"
        className={
          state.updateToggleActive
            ? 'toggle-admin-form-button-on'
            : 'toggle-admin-form-button-off'
        }
        type="button"
        onClick={handleUpdateToggle}
      >
        Mettre à jour un Membre
      </button>
      <button
        id="delete-member"
        className={
          state.deleteToggleActive
            ? 'toggle-admin-form-button-on'
            : 'toggle-admin-form-button-off'
        }
        type="button"
        onClick={handleDeleteToggle}
      >
        Supprimer un Membre
      </button>

      <h3 className="display-title">MEMBRES:</h3>
      <table className="display-members-container">
        <thead>
          <th className="id">Id</th>
          <th className="last-name">Nom</th>
          <th className="first-name">Prénom</th>
          <th className="email">Email</th>
          <th className="tel-number">Numéro de tel.</th>
          <th className="club-role">Rôle</th>
          <th className="web-admin">Web Admin</th>
          <th className="avatar">Photo</th>
        </thead>
        <tbody>
          {members.map((member) => (
            <Member
              key={member.id}
              {...member}
              refreshUpdate={state.refreshUpdate}
            />
          ))}
        </tbody>
      </table>

      <form className="member-params" onSubmit={handleSubmit}>
        {!state.createToggleActive && (
          <label htmlFor="memberId">
            Id Membre:
            <input
              type="text"
              id="memberId"
              value={state.memberId}
              onChange={(e) =>
                dispatch({
                  type: UPDATE_MEMBER_ID,
                  payload: e.target.value,
                })
              }
            />
          </label>
        )}

        {!state.deleteToggleActive && (
          <label className="admin-check" htmlFor="webAdmin">
            Ce membre sera-t-il administrateur du Site Web?
            <select
              id="webAdmin"
              onChange={(e) =>
                dispatch({
                  type: UPDATE_WEB_ADMIN,
                  payload: e.target.value,
                })
              }
              value={state.websiteAdmin}
            >
              <option value="0">Non</option>
              <option value="1">Oui</option>
            </select>
          </label>
        )}
        <div className="member-content">
          {!state.deleteToggleActive && (
            <label htmlFor="lastName">
              NOM:
              <input
                type="text"
                id="lastName"
                value={state.lastName}
                onChange={(e) =>
                  dispatch({
                    type: UPDATE_LAST_NAME,
                    payload: e.target.value,
                  })
                }
              />
            </label>
          )}

          {!state.deleteToggleActive && (
            <label htmlFor="firstName">
              Prénom:
              <input
                type="text"
                id="firstName"
                value={state.firstName}
                onChange={(e) =>
                  dispatch({
                    type: UPDATE_FIRST_NAME,
                    payload: e.target.value,
                  })
                }
              />
            </label>
          )}

          {!state.deleteToggleActive && (
            <label htmlFor="email">
              Email:
              <input
                type="text"
                id="email__inter"
                value={state.email}
                onChange={(e) =>
                  dispatch({ type: UPDATE_EMAIL, payload: e.target.value })
                }
              />
            </label>
          )}

          {!state.deleteToggleActive && (
            <label htmlFor="phoneNumber">
              Numéro de téléphone:
              <input
                type="tel"
                id="phoneNumber"
                value={state.phoneNumber}
                onChange={(e) =>
                  dispatch({
                    type: UPDATE_PHONE_NUMBER,
                    payload: e.target.value,
                  })
                }
              />
            </label>
          )}

          {!state.deleteToggleActive && (
            <label htmlFor="clubRole">
              Rôle dans le club:
              <select
                id="clubRole"
                onChange={(e) =>
                  dispatch({
                    type: UPDATE_CLUB_ROLE,
                    payload: e.target.value,
                  })
                }
                value={state.clubRole}
              >
                <option value="Membre">Membre</option>
                <option value="Membre du Bureau ">Membre du bureau</option>
                <option value="Formateur">Formateur</option>
              </select>
            </label>
          )}

          {!state.deleteToggleActive && (
            <label htmlFor="avatar">
              Photo du Membre:
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/png, image/jpeg, image/jpg"
                onChange={handleChangeFile}
              />
            </label>
          )}
        </div>

        <button className="submit-button" type="submit">
          Valider
        </button>
      </form>
      {errorOn && <Error />}
    </div>
  );
};

export default AdminInterfaceMembers;
