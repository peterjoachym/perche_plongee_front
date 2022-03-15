/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ModalClubEvent from '../../components/ModalClubEvent/ModalClubEvent';
import './ClubEvents.css';

const { REACT_APP_API_URL } = process.env;

function ClubEvents() {
  const [clubEvent, setClubEvent] = useState([]);
  const [filterEvents, setFilterEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idModal, setIdModal] = useState(0);
  const buttons = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/api/events?is_public=true`).then((res) => {
      setClubEvent(res.data);
      setFilterEvents(res.data);
    });
  }, []);
  const handleClickModal = (id) => {
    setIdModal(id);
    console.log(id);
    setShowModal(true);
  };

  const handleFutureEvents = () => {
    const date = new Date().getTime();
    console.log(date);
    const future = clubEvent.filter((futur) => {
      return new Date(futur.event_date).getTime() > date;
    });
    return setFilterEvents(future);
  };

  const handlePastEvents = () => {
    const date = new Date().getTime();
    const future = clubEvent.filter((futur) => {
      return new Date(futur.event_date).getTime() < date;
    });
    return setFilterEvents(future);
  };

  return (
    <div>
      <div className="page-title-container">
        <h1 className="page-title">Nos Événements</h1>
      </div>

      <div className="club-events-container">
        <button
          className="submit-button"
          type="button"
          style={{ margin: '2%' }}
          onClick={handlePastEvents}
        >
          Événements passés
        </button>
        <button
          className="submit-button"
          type="button"
          onClick={handleFutureEvents}
        >
          Événements à venir
        </button>

        {filterEvents
          .filter(
            (onlyEvents) =>
              onlyEvents.event_type !== 'formation' &&
              onlyEvents.event_type !== 'bapteme' &&
              onlyEvents.event_type !== 'inscription'
          )
          .map((filterEvent, index) => (
            <div className="timeline" key={`event-${filterEvent.id}`}>
              {index % 2 === 0 ? (
                <>
                  <div className="timeline-component">
                    {filterEvent.pictures
                      .filter((picture) => picture.is_poster === 1)
                      .map((poster, i) => (
                        <>
                          {i === 0 ? (
                            <img
                              className="avatar"
                              src={`${REACT_APP_API_URL}/pictures/club-events/${poster.file_name}`}
                              alt={poster.picture_description}
                              key={`poster-${poster.id}`}
                            />
                          ) : null}
                        </>
                      ))}
                  </div>
                  <div className="timeline-middle">
                    <div className="timeline-point" />
                  </div>
                  <div className="timeline-component-bg">
                    <div className="date">
                      <h3>
                        {new Date(filterEvent.event_date).toLocaleString(
                          'fr-FR',
                          buttons
                        )}
                      </h3>
                    </div>
                    <h2 className="timeline-title">{filterEvent.title}</h2>
                    <p className="timeline-paragraph">
                      {filterEvent.event_locality}
                    </p>
                    <button
                      type="button"
                      className="main-btn"
                      onClick={() => handleClickModal(filterEvent.id)}
                    >
                      Plus d&apos;infos
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="timeline-component-bg-2">
                    <div className="date">
                      <h3>
                        {new Date(filterEvent.event_date).toLocaleString(
                          'fr-FR',
                          buttons
                        )}
                      </h3>
                    </div>
                    <h2 className="timeline-title">{filterEvent.title}</h2>
                    <p className="timeline-paragraph">
                      {filterEvent.event_locality}
                    </p>
                    <button
                      type="button"
                      className="toggle-admin-form-button-on"
                      onClick={() => handleClickModal(filterEvent.id)}
                    >
                      Plus d&apos;infos
                    </button>
                  </div>
                  <div className="timeline-middle">
                    <div className="timeline-point" />
                  </div>
                  <div className="timeline-component-2">
                    {filterEvent.pictures
                      .filter((picture) => picture.is_poster === 1)
                      .map((poster, i) => (
                        <>
                          {i === 0 ? (
                            <img
                              className="avatar"
                              src={`${REACT_APP_API_URL}/pictures/club-events/${poster.file_name}`}
                              alt={poster.picture_description}
                              key={`poster-${poster.id}`}
                            />
                          ) : null}
                        </>
                      ))}
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
      {showModal && (
        <ModalClubEvent
          title={clubEvent.title}
          // event={filter}
          open={showModal}
          handleOpen={setShowModal}
          training={clubEvent}
          idModal={idModal}
        />
      )}
    </div>
  );
}

export default ClubEvents;
