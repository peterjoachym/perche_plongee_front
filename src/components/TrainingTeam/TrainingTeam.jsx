import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrainingTeam() {
  const [details, setDetails] = useState([]);
  const [avatarData, setAvatarData] = useState([]);
  const [id, setId] = useState();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/users?club_role=trainers`)
      .then((res) => {
        setDetails(res.data);
        setId(res.data.id);
      });
  }, []);

  const getAvatarData = async () => {
    try {
      await details;
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/users/${id}/avatars`,
        { withCredentials: true }
      );
      return setAvatarData(resp.data[0]);
    } catch (err) {
      return err.response;
    }
  };

  useEffect(() => {
    getAvatarData();
  }, []);
  return (
    <>
      {details
        .filter((trainers) => trainers.club_role === 'Formateur')
        .map((formateurCard) => (
          <>
            <h2>
              {formateurCard.firstname} {formateurCard.lastname}
            </h2>
            <div>
              {avatarData && (
                <img
                  className="mini-avatar"
                  src={`${process.env.REACT_APP_API_URL}/pictures/avatars/${avatarData.file_name}`}
                  alt={avatarData.picture_description}
                />
              )}
            </div>
          </>
        ))}
    </>
  );
}

export default TrainingTeam;
