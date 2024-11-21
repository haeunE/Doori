import React, { useState } from 'react';
import '../css/SmallCard.css';

const SmallCard = ({ ratedYn, title, start_h, start_m, end_h, end_m, remainingSeats }) => {
  const [end_hour] = useState(start_m + end_m >= 60 ? start_h + end_h + 1 : start_h + end_h)
  const [end_minute] = useState(start_m + end_m >= 60 ? (start_m + end_m) % 60 : start_m + end_m)
  return (
    <div className="movie-card">
      <div className="movie-card__header">
        <img className="movie-card__age-rating" src={ratedYn}/>
        <h3 className="movie-card__title">{title}</h3>
      </div>
      <div className="movie-card__details">
        <p className="movie-card__duration">{start_h} : {start_m} ~ {end_hour} : {end_minute}</p>
        <p className="movie-card__seats">
          남은 좌석: {remainingSeats} / 20
        </p>
      </div>
    </div>
  );
};

export default SmallCard;