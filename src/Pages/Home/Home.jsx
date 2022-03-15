import React from 'react';
import './Home.css';
import Slider from '../../components/Carousel/Slider';
import Calendar from '../../components/Calendar/Calendar';
import HomeTraining from '../../components/HomeTraining/HomeTraining';
// import FreeCourse from '../../components/FreeCourse/FreeCourse';

function Home() {
  return (
    <div>
      <Slider />
      <section className="about">
        <div className="content">
          <div className="text">
            <h1>PRÉSENTATION DU CLUB</h1>
            <p>
              Perche Plongée a été créé en 2001, mais c’est en 2004 qu’il a pris
              son extension avec l’ouverture de la piscine Aquaval rue
              Saint-Hilaire à Nogent le Rotrou. <br /> <br /> Nos activités se
              font dans cette piscine, tous les lundis et tous les mercredis de
              20h à 22h, excepté pendant les vacances scolaires. <br /> <br />{' '}
              Nos buts : Former des plongeurs, organiser des sorties, des
              activités ludiques ou des voyages. Partager une passion commune en
              toute convivialité...
            </p>
          </div>

          <Calendar />
        </div>
        <HomeTraining />
        {/* <FreeCourse /> */}
      </section>
    </div>
  );
}

export default Home;
