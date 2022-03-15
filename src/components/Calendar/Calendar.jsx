import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_API_URL } = process.env;

function Calendar() {
  const [filterEvents, setFilterEvents] = useState([]);
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/api/events?is_public=true`).then((res) => {
      setFilterEvents(res.data);
    });
  }, []);
  const navigate = useNavigate();

  return (
    <div className="container-event">
      <h1>PROCHAINS ÉVÉNEMEMENTS</h1>
      <div className="container-timeline">
        <div className="timeline-home">
          <ul>
            <li>
              {filterEvents
                .filter(
                  (onlyEvents, index) =>
                    onlyEvents.event_type !== 'formation' && index < 2
                )
                .map((filterEvent) => (
                  <div
                    className="timeline-content-home"
                    key={`event-${filterEvent.id}`}
                  >
                    <p>
                      {new Date(filterEvent.event_date).toLocaleString(
                        'fr-FR',
                        options
                      )}
                    </p>
                    <div className="timeline-illustration">
                      {filterEvent.pictures
                        .filter((picture) => picture.is_poster === 1)
                        .map((poster) => (
                          <img
                            className="avatar"
                            src={`${REACT_APP_API_URL}/pictures/club-events/${poster.file_name}`}
                            alt={poster.picture_description}
                            key={`poster-${poster.id}`}
                          />
                        ))}{' '}
                      <h2>{filterEvent.title}</h2>
                    </div>
                  </div>
                ))}
            </li>
          </ul>
          <button
            type="button"
            className="toggle-admin-form-button-on"
            onClick={() => {
              navigate('/evenements');
            }}
          >
            DÉCOUVRIR LES ÉVÉNEMEMENTS
            <img src="./chevron-right.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Calendar;
