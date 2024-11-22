import React from "react";
// import Myreservation from "../../pages/Myreservation";
// import "./css/MyReviews.css";

function WatchedMovie(props) {
  const { title, date, seats, seatPrice, posterUrl } = props;
  const totalPrice = seats.length * seatPrice;

  return (
    <div>
      <div className="movieCard">

        <img
          className="cards__item__img"
          alt="Movie Poster"
          src={props.link} // 포스터 url
        />
      </div>

      <div className="movieInfo">
        <p className="title">제목: {title}</p>
        <p className="date-time">상영일: {date}</p>
        <p className="seat">좌석 번호: {seats.join(", ")}</p>
        <p className="price">결제 금액: {totalPrice} 원</p>
      </div>
    </div>
  );
}

export default WatchedMovie;
