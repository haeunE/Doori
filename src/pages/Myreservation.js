import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Myreservation.css';
import Review from "../components/js/Review";

function Myreservation() {
  const [reservationList, setReservationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittedReviews, setSubmittedReviews] = useState({});
  const ticketPrice = 7000;

  useEffect(() => {
    axiosInstance
      .get("/doori/myreservation")
      .then(response => {
        const sortedReservations = response.data.sort((a, b) => {
          return new Date(b.movieDate) - new Date(a.movieDate);
        });
        setReservationList(sortedReservations);
        setLoading(false);
      })
      .catch(error => {
        console.error("예약 정보를 가져오는 중 오류가 발생했습니다: ", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>로딩중...</div>;
  }

  if (reservationList.length === 0) {
    return <div className="noReservationMessage">예약이 없습니다.</div>;
  }

  const isReviewTime = (movieDate) => {
    const now = new Date();
    const showDate = new Date(movieDate);
    const diffInTime = now - showDate;
    const diffInDays = diffInTime / (1000 * 3600 * 24);
    return diffInDays >= 1;
  };

  const handleReviewClick = (reservationId) => {
    setSubmittedReviews(prevState => ({ ...prevState, [reservationId]: false }));
  };

  const handleReviewClose = (reservationId) => {
    setSubmittedReviews(prevState => ({ ...prevState, [reservationId]: true }));
  };

  const handleReviewSubmit = (data, reservationId) => {
    axiosInstance.post("/doori/review", data)
     console.log(data)
      .then(response => {
        setSubmittedReviews(prevState => ({ ...prevState, [reservationId]: true }));
      }).catch(error => {
        console.log(error);
      });
  };

  return (
    <div className="Myreservation">
      <ul>
        {reservationList.map((reservation, index) => {
          const seatCount = reservation.seatNm.length;
          const totalPrice = seatCount * ticketPrice;

          return (
            <li key={reservation.reservationId || index} className="reservationItem">
              <div className="movieCard">
                <img
                  className="poster"
                  src={reservation.moviePoster || "/img/non_img.png"}
                  alt="Movie Poster"
                />
              </div>
              <div className="movieInfo">
                <p className="title">{reservation.title}</p>
                <p className="date-time">상영일: {new Date(reservation.movieDate).toLocaleString()}</p>
                <p className="reservedSeat">좌석 번호: {reservation.seatNm.join(", ")}</p>
                <p className="price">결제 금액: {totalPrice.toLocaleString()} 원</p>

                <div className="buttonContainer">
                  {!isReviewTime(reservation.movieDate) ? (
                    <button className="cancelButton">예약 취소</button>
                  ) : (
                    <div className="review_btn">
                      {!submittedReviews[reservation.reservationId] && (
                        <button
                          className="reviewButton"
                          onClick={() => handleReviewClick(reservation.reservationId)}
                        >
                          리뷰 쓰기
                        </button>
                      )}
                      {submittedReviews[reservation.reservationId] === false && (
                        <div className="reviewModal">
                          <Review
                            movieId={reservation.movieId}
                            onSubmit={(data) => handleReviewSubmit(data, reservation.reservationId)}
                            onClose={() => handleReviewClose(reservation.reservationId)}
                            color="white"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Myreservation;
