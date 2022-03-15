/* eslint-disable camelcase */
import React, { useContext, useState, useEffect } from 'react';
import './MemberCard.css';
import axios from 'axios';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const MemberCard = (props) => {
  const { id, lastname, firstname, email, tel_number } = props;
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
  }, []);

  return (
    <div className="member-card">
      <img
        className="avatar"
        src={
          !avatarData
            ? './Avatar.png'
            : `${process.env.REACT_APP_API_URL}/pictures/avatars/${avatarData.file_name}`
        }
        alt={!avatarData ? 'Avatar' : avatarData.picture_description}
      />
      <p>
        {lastname} {firstname}
      </p>
      <p>{tel_number}</p>
      <p>{email}</p>
      {errorOn && <Error />}
    </div>
  );
};

export default MemberCard;
