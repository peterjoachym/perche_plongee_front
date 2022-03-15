import React, { useState } from 'react';
import './Slider.css';
import dataSlider from './DataSlider';
import BtnSlider from './BtnSlider';

export default function Slider() {
  const [slideIndex, setSlideIndex] = useState(1);

  const nextSlide = () => {
    if (slideIndex !== dataSlider.length) {
      setSlideIndex(slideIndex + 1);
    } else if (slideIndex === dataSlider.length) {
      setSlideIndex(1);
    }
  };

  const prevSlide = () => {
    if (slideIndex !== 1) {
      setSlideIndex(slideIndex - 1);
    } else if (slideIndex === 1) {
      setSlideIndex(dataSlider.length);
    }
  };

  const moveDot = (index) => {
    setSlideIndex(index);
  };

  return (
    <div className="container-slider">
      {dataSlider.map((obj, index) => {
        return (
          <div
            key={obj.id}
            className={slideIndex === index + 1 ? 'slide active-anim' : 'slide'}
          >
            <img src={`Imgs/img${index + 1}.jpg`} alt="test" />
            <div className="imagestitle">
              <h1>PERCHE PLONGÉE</h1>
              <h2>CLUB DE NOGENT-LE-ROTROU</h2>
            </div>
          </div>
        );
      })}
      <BtnSlider moveSlide={nextSlide} direction="next" />
      <BtnSlider moveSlide={prevSlide} direction="prev" />
      <div className="container-dots">
        {dataSlider.map((item, index) => (
          <button
            key={`button-slide-${index}`}
            type="button"
            aria-label="slide"
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? 'dot active' : 'dot'}
          />
        ))}
      </div>
    </div>
  );
}
