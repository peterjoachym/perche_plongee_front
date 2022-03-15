/* eslint-disable camelcase */
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';
import '../Member/Member.css';

const Picture = (props) => {
  const {
    id,
    picture_description,
    author,
    is_public,
    is_poster,
    // club_event_id,
    evenementId,
  } = props;

  const [pictureData, setPictureData] = useState('');
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);

  const getPictureData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/events/${evenementId}/pictures`,
        { withCredentials: true }
      );
      setPictureData(resp.data[0]);
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };
  useEffect(() => {
    getPictureData();
  }, []);

  const deletePicture = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/pictures/${id}`);
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };

  return (
    <>
      {evenementId && (
        <tr className="member-line">
          <td>{id}</td>
          <td>{picture_description}</td>
          <td>{author}</td>
          <td>{is_public ? 'OUI' : 'NON'}</td>
          <td>{is_poster ? 'OUI' : 'NON'}</td>
          <td>
            {pictureData && (
              <img
                className="picture__admin__events"
                src={
                  getPictureData
                    ? `${process.env.REACT_APP_API_URL}/pictures/club-events/${pictureData.file_name}`
                    : 'no picture'
                }
                alt={pictureData.picture_description}
              />
            )}
          </td>
          <button onClick={deletePicture} type="button">
            Effacer
          </button>
        </tr>
      )}
      {errorOn && <Error />}
    </>
  );
};

export default Picture;
