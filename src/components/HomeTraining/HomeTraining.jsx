import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { REACT_APP_API_URL } = process.env;

function HomeTraining() {
  const [clubTraining, setClubTraining] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/api/events?is_public=true`).then((res) => {
      setClubTraining(res.data);
      // console.log(clubTraining);
    });
  }, []);

  return (
    <div className="training-home">
      <h1>NOS FORMATIONS DISPONIBLES</h1>
      <div className="training-content">
        {clubTraining
          .filter(
            (onlyTraining, index) =>
              onlyTraining.event_type === 'formation' && index < 3
          )
          .map((filter) => (
            <div
              className="training-illustration"
              key={`training-${filter.id}`}
            >
              {filter.pictures
                .filter((picture) => picture.is_poster === 1)
                .map((poster) => (
                  <div
                    className="container"
                    key={`training-poster-${poster.id}`}
                  >
                    <img
                      className="illustration"
                      src={`${REACT_APP_API_URL}/pictures/club-events/${poster.file_name}`}
                      alt={poster.picture_description}
                    />
                  </div>
                ))}
            </div>
          ))}
      </div>
      <button
        type="button"
        className="toggle-admin-form-button-on"
        onClick={() => {
          navigate('/formations');
        }}
      >
        DÉCOUVRIR LES FORMATIONS
      </button>
    </div>
  );
}

export default HomeTraining;
