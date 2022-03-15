import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ModalTraining from '../../components/ModalTraining/ModalTraining';
import './Training.css';

const { REACT_APP_API_URL } = process.env;

function Training() {
  const [clubTraining, setClubTraining] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idModal, setIdModal] = useState(0);

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/api/events?is_public=true`).then((res) => {
      setClubTraining(res.data);
      console.log(clubTraining);
    });
  }, []);
  const handleClickModal = (id) => {
    setIdModal(id);
    console.log(id);
    setShowModal(true);
  };
  return (
    <div>
      <section className="training">
        <h1>Nos Formations</h1>
        <h2 className="training__intro">
          Notre but est de préparer les nouveaux adhérents à se familiariser
          avec les sports subaquatiques que sont l&apos;apnée et/ou la plongée
          avec bouteille. C&apos;est ainsi que nous formons les plongeurs vers
          les différents degrés d’autonomie en plongée.
        </h2>
        <div className="cards">
          {clubTraining
            .filter((onlyTraining) => onlyTraining.event_type === 'formation')
            .map((filter) => (
              <>
                <div className="card">
                  {filter.pictures
                    .filter((picture) => picture.is_poster === 1)
                    .map((poster) => (
                      <div className="container">
                        <img
                          className="illustration"
                          src={`${process.env.REACT_APP_API_URL}/pictures/club-events/${poster.file_name}`}
                          alt={poster.picture_description}
                        />
                      </div>
                    ))}{' '}
                  <p>{filter.title}</p>
                  <button
                    type="button"
                    className="main-btn"
                    onClick={() => handleClickModal(filter.id)}
                  >
                    Plus d&apos;infos
                  </button>
                </div>
              </>
            ))}
          <>
            {showModal && (
              <ModalTraining
                key={clubTraining.id}
                title={clubTraining.title}
                // event={filter}
                open={showModal}
                handleOpen={setShowModal}
                training={clubTraining}
                idModal={idModal}
              />
            )}
          </>
        </div>
      </section>
    </div>
  );
}

export default Training;
