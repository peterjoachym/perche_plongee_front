import React, { useEffect, useState } from 'react';
import axios from 'axios';
import parse from 'html-react-parser';
import './RegistrationInfos.css';

const { REACT_APP_API_URL } = process.env;

function RegistrationInfos() {
  const [clubTraining, setClubTraining] = useState([]);

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/api/events?is_public=true`).then((res) => {
      setClubTraining(res.data);
    });
  }, []);

  return (
    <div>
      <div className="page-title-container">
        <h1 className="page-title">Inscription</h1>
      </div>

      <div>
        {clubTraining
          .filter((registration) => registration.event_type === 'inscription')
          .map((filter) => (
            <>
              <div>
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
              </div>
              <div>
                {filter.event_description && parse(filter.event_description)}
              </div>
              <div className="price__registration">
                {filter.prices
                  .filter((publicPrice) => publicPrice.is_public === 1)
                  .map((results) => (
                    <>
                      <h2>{results.title_price}</h2>
                      <h3>{results.price}</h3>
                    </>
                  ))}
              </div>
            </>
          ))}
      </div>
    </div>
  );
}

export default RegistrationInfos;
