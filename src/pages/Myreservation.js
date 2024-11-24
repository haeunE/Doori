import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Myreservation.css';
import Review from "../components/js/Review";
import { data } from "@remix-run/router";

function Myreservation() {
  const [reservationList, setReservationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittedReview, setSubmittedReview] = useState({});
  const ticketPrice = 7000;
  const [now, setNow] = useState(new Date()); // 현재 시간 상태 추가

  // 현재 시간을 10분마다 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 600000); // 10분마다 업데이트
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/doori/myreservation")
      .then(response => {
        console.log(response.data);
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

  const isReviewTime = (movieDate, runningTime) => {
    const showDate = new Date(new Date(movieDate).getTime() + runningTime * 60000);
    return now > showDate; // 현재 시간이 showDate를 넘었는지 확인
  };

  const handleReviewClick = (reservationId) => {
    setSubmittedReview(prevState => ({ ...prevState, [reservationId]: false }));
  };

  const handleReviewClose = (reservationId) => {
    // 모달 창을 닫을 때 상태를 undefined로 설정하여 리뷰 쓰기 버튼이 다시 활성화되도록 함
    setSubmittedReview(prevState => ({ ...prevState, [reservationId]: undefined }));
  };

  const handleReviewSubmit = (data, reservationId) => {
    axiosInstance.post("/doori/review", data)
      .then(response => {
        setSubmittedReview(prevState => ({ ...prevState, [reservationId]: true }));
        console.log(response.data)
      }).catch(error => {
        console.log(error);
      });
  };

  const handleDeleteReservation = (reservationIds) => {
    // 확인 창 띄우기
    const isConfirmed = window.confirm("정말로 예약을 취소하시겠습니까?");
    if (isConfirmed) {
      axiosInstance.delete(
        "/doori/reservation/delete", {
          data: reservationIds, // Request Body로 예약 ID 배열 전달
        })
        .then(response => {
          console.log(`예약 ${reservationIds} 취소됨`);
          alert(response.data);

          // 예약 취소 후, 예약 목록에서 해당 예약을 제거
          setReservationList(prevList => prevList.filter(reservation => reservation.reservationId !== reservationIds));
        })
        .catch(error => {
          console.log(`예약 ${reservationIds} 취소 중 오류 발생: `, error);
        });
    } else {
      console.log("예약 취소가 취소되었습니다.");
    }
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
                  {!isReviewTime(reservation.movieDate, reservation.runningtime) ? (
                    <button className="cancelButton" onClick={
                      () => handleDeleteReservation(reservation.reservationId)
                    }>예약 취소</button>
                  ) : (
                    <div className="review_btn">
                      {!submittedReview[reservation.reservationId] && (
                        <button
                          className="reviewButton"
                          onClick={() => handleReviewClick(reservation.reservationId)}
                        >
                          리뷰 쓰기
                        </button>
                      )}
                      {submittedReview[reservation.reservationId] === false && (
                        <div className="reviewModal">
                          <Review
                            movieId={reservation.movieId}
                            onSubmit={(data) => handleReviewSubmit(data, reservation.reservationId)}
                            onClose={() => handleReviewClose(reservation.reservationId)} // 닫기 처리
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
