/* eslint-disable camelcase */
import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import parse from 'html-react-parser';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const ClubTraining = (props) => {
  const {
    id,
    title,
    event_description,
    event_locality,
    event_type,
    evenementId,
    setEvenementId,
    refreshUpdate,
  } = props;
  const [clubEventData, setClubEventData] = useState('');
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);

  const getClubEventData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/events/${id}`
      );
      setClubEventData(resp.data);
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };

  useEffect(() => {
    getClubEventData();
  }, [refreshUpdate]);

  return (
    <>
      {clubEventData && (
        <tr
          className={
            evenementId === id ? 'member-line bg__valid' : 'member-line'
          }
          onClick={() => setEvenementId(id)}
          type="button"
        >
          <td>{id}</td>
          <td>{title}</td>
          <td>{parse(event_description)}</td>
          <td>{event_locality}</td>
          <td>{event_type}</td>
        </tr>
      )}
      {errorOn && <Error />}
    </>
  );
};

export default ClubTraining;
