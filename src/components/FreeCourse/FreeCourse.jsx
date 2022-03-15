import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

function FreeCourse() {
  const [clubFreeCourse, setClubFreeCourse] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${REACT_APP_API_URL}/api/events?is_public=true`).then((res) => {
      setClubFreeCourse(res.data);
      console.log(clubFreeCourse);
    });
  }, []);

  const handleNavigate = (e) => {
    e.preventDefault();
    navigate('/inscription');
  };

  return (
    <div>
      <section className="FreeCourse">
        <h1>Offre de baptême de plongée</h1>
        <div className="cards">
          {clubFreeCourse
            .filter((onlyFreeCourse) => onlyFreeCourse.event_type === 'bapteme')
            .map((filter) => (
              <>
                <div className="card">
                  {filter.pictures
                    .filter((picture) => picture.is_poster === 1)
                    .map((poster) => (
                      <div className="container">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/pictures/club-events/${poster.file_name}`}
                          alt={poster.picture_description}
                        />
                      </div>
                    ))}{' '}
                  <h1>{filter.title}</h1>
                  <p>{filter.description}</p>
                  <button
                    type="button"
                    className="main-btn"
                    onClick={handleNavigate}
                  >
                    Plus d&apos;infos
                  </button>
                </div>
              </>
            ))}
        </div>
      </section>
    </div>
  );
}

export default FreeCourse;
