import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import parse from 'html-react-parser';
import TrainingTeam from '../TrainingTeam/TrainingTeam';
import Error from '../Error/Error';
import ErrorContext from '../../contexts/ErrorContext';

const { REACT_APP_API_URL } = process.env;

const ClubEvent = (props) => {
  const {
    id,
    title,
    event_date,
    event_description,
    event_locality,
    event_type,
    evenementId,
    setEvenementId,
  } = props;
  const [clubEventData, setClubEventData] = useState('');
  const { errorOn, setErrorOn, setErrorMessage } = useContext(ErrorContext);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const getClubEventData = async () => {
    try {
      const resp = await axios.get(`${REACT_APP_API_URL}/api/events/${id}`);
      setClubEventData(resp.data);
    } catch (err) {
      setErrorMessage(err.response.data);
      setErrorOn(true);
    }
  };

  useEffect(() => {
    getClubEventData();
  }, []);

  return (
    <>
      {clubEventData && (
        <>
          <tr
            className={
              evenementId === id ? 'member-line bg__valid' : 'member-line'
            }
            type="button"
            onClick={() => setEvenementId(id)}
          >
            <td>{id}</td>
            <td>{title}</td>
            <td>{new Date(event_date).toLocaleString('fr-FR', options)}</td>
            <td>{parse(event_description)}</td>
            <td>{event_locality}</td>
            <td>{event_type}</td>
          </tr>
        </>
      )}
      <TrainingTeam />
      {errorOn && <Error />}
    </>
  );
};

export default ClubEvent;
