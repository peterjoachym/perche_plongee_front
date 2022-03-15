import React, { useState, useEffect } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import '../ModalClubEvent/ModalClubEvent.css';

const { REACT_APP_API_URL } = process.env;

function ModalTraining({ open, handleOpen, training, idModal }) {
  const [clubTraining, setClubTraining] = useState([]);

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/api/events?is_public=true`).then((res) => {
      setClubTraining(res.data);
      console.log(clubTraining);
    });
  }, []);
  return (
    <>
      <div className={`modal__training ${open ? '_open' : '_hidden'}`}>
        {training
          .filter((select) => select.id === idModal)
          .map((modal, i) => (
            <>
              <div className="modal__container__event">
                <div className="modal__content">
                  <button
                    className="main-btn"
                    type="button"
                    onClick={() => handleOpen(false)}
                  >
                    x
                  </button>
                  <h1 key={i} className="event__modal">
                    {modal.title}
                  </h1>
                  <div>
                    {modal.event_description && parse(modal.event_description)}
                  </div>
                  <div className="img__modal__event">
                    {modal.pictures
                      .filter((picture) => picture.is_public === 1)
                      .map((poster) => (
                        <img
                          className="illustration"
                          src={`${REACT_APP_API_URL}/pictures/club-events/${poster.file_name}`}
                          alt={poster.picture_description}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </>
          ))}
      </div>
    </>
  );
}

export default ModalTraining;
