import React from 'react';
import './Slider.css';
import leftArrow from './icons/left-chevron.png';
import rightArrow from './icons/right-chevron.png';

export default function BtnSlider({ direction, moveSlide }) {
  return (
    <button
      type="button"
      onClick={moveSlide}
      className={direction === 'next' ? 'btn-slide next' : 'btn-slide prev'}
    >
      <img src={direction === 'next' ? rightArrow : leftArrow} alt="chevron" />
    </button>
  );
}
