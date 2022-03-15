/* eslint-disable camelcase */
import React, { useEffect, useState, useContext } from 'react';
import './Member.css';
import axios from 'axios';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const Member = (props) => {
  const {
    id,
    lastname,
    firstname,
    email,
    tel_number,
    club_role,
    website_admin,
    refreshUpdate,
  } = props;

  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);
  const [avatarData, setAvatarData] = useState('');

  const getAvatarData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/${id}/avatars`,
        { withCredentials: true }
      );
      setAvatarData(resp.data[0]);
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };

  useEffect(() => {
    getAvatarData();
  }, [refreshUpdate]);

  return (
    <>
      {/* // <div className="member-container"> */}
      <tr className="member-line">
        <td>{id}</td>
        <td>{lastname}</td>
        <td>{firstname}</td>
        <td>{email}</td>
        <td>{tel_number}</td>
        <td>{club_role}</td>
        <td>{website_admin ? 'OUI' : 'NON'}</td>
        <td>
          {avatarData && (
            <img
              className="mini-avatar"
              src={`${process.env.REACT_APP_API_URL}/pictures/avatars/${avatarData.file_name}`}
              alt={avatarData.picture_description}
            />
          )}
        </td>
      </tr>
      {errorOn && <Error />}
    </>
  );
};

export default Member;
