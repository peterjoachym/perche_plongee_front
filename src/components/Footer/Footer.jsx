import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <div>
      <section className="footer">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#0066CB"
            fillOpacity="1"
            d="M0,224L60,229.3C120,235,240,245,360,229.3C480,213,600,171,720,170.7C840,171,960,213,1080,213.3C1200,213,1320,171,1380,149.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          />
        </svg>
        <div className="footer-container">
          <div className="footer-content">
            <div className="info">
              <div className="contact">
                <img
                  className="logo"
                  src="./logo-perche-plongee-white.png"
                  alt=""
                  width="100px"
                />
                <p>
                  19 rue de Nazareth <br /> 28400 Nogent le Rotrou <br /> FRANCE{' '}
                </p>
                <div className="socials-media">
                  <img src="./facebook.png" alt="" />
                  <img src="./youtube.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Footer;
