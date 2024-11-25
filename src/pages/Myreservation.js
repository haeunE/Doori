import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import "./css/Myreservation.css";
import Review from "../components/js/Review";

function Myreservation() {
  const [reservationList, setReservationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submittedReview, setSubmittedReview] = useState({});
  const [reviewedTimetableIds, setReviewedTimetableIds] = useState([]);
  const ticketPrice = 7000;
  const [now, setNow] = useState(new Date());

  // 현재 시간 10분마다 업데이트
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 600000);
    return () => clearInterval(timer);
  }, []);

  // 예약 목록 가져오기
  useEffect(() => {
    axiosInstance
      .get("/doori/myreservation")
      .then((response) => {
        const sortedReservations = response.data.sort(
          (a, b) => new Date(b.movieDate) - new Date(a.movieDate)
        );
        setReservationList(sortedReservations);
        setLoading(false);
      })
      .catch((error) => {
        console.error("예약 정보를 가져오는 중 오류: ", error);
        setLoading(false);
      });
  }, []);

  // 작성된 리뷰 목록 가져오기
  useEffect(() => {
    axiosInstance
      .get("/doori/reviews")
      .then((response) => setReviewedTimetableIds([...response.data]))
      .catch((error) => console.log("리뷰 정보 가져오기 실패: ", error));
  }, []);

  const isReviewTime = (movieDate, runningTime) => {
    const showDate = new Date(
      new Date(movieDate).getTime() + runningTime * 60000
    );
    return now > showDate;
  };

  const handleReviewClick = (timetableId) =>
    setSubmittedReview((prevState) => ({ ...prevState, [timetableId]: false }));

  const handleReviewClose = (timetableId) =>
    setSubmittedReview((prevState) => ({ ...prevState, [timetableId]: undefined }));

  const handleReviewSubmit = (data, timetableId) => {
    axiosInstance
      .post("/doori/review", data)
      .then((response) => {
        setSubmittedReview((prevState) => ({
          ...prevState,
          [timetableId]: true,
        }));
        setReviewedTimetableIds((prevIds) => [...prevIds, timetableId]);
      })
      .catch((error) => console.log("리뷰 제출 오류: ", error));
  };

  const handleDeleteReservation = (reservationId) => {
    if (window.confirm("예약을 취소하시겠습니까?")) {
      axiosInstance
        .delete("/doori/reservation/delete", { data: reservationId })
        .then((response) => {
          setReservationList((prevList) =>
            prevList.filter((item) => item.reservationId !== reservationId)
          );
        })
        .catch((error) => console.log("예약 취소 오류: ", error));
    }
  };

  if (loading) return <div>로딩중...</div>;

  if (reservationList.length === 0)
    return <div className="noReservationMessage">예약이 없습니다.</div>;

  return (
    <div className="Myreservation">
      <ul>
        {reservationList.map((reservation) => {
          const seatCount = reservation.seatNm.length;
          const totalPrice = seatCount * ticketPrice;

          return (
            <li key={reservation.reservationId} className="reservationItem">
              <div className="movieCard">
                <img
                  className="poster"
                  src={reservation.moviePoster || "/img/non_img.png"}
                  alt="Movie Poster"
                />
              </div>
              <div className="movieInfo">
                <p className="title">{reservation.title}</p>
                <p className="date-time">
                  상영일: {new Date(reservation.movieDate).toLocaleString()}
                </p>
                <p className="reservedSeat">
                  좌석 번호: {reservation.seatNm.join(", ")}
                </p>
                <p className="price">
                  결제 금액: {totalPrice.toLocaleString()} 원
                </p>
                <div className="buttonContainer">
                  {!isReviewTime(reservation.movieDate, reservation.runningtime) ? (
                    <button
                      className="cancelButton"
                      onClick={() => handleDeleteReservation(reservation.reservationId)}
                    >
                      예약 취소
                    </button>
                  ) : (
                    <>
                      {reviewedTimetableIds.includes(reservation.timetableId) ? (
                        <p className="reviewCompletedMessage">리뷰 작성 완료</p>
                      ) : (
                        <button
                          className="reviewButton"
                          onClick={() => handleReviewClick(reservation.timetableId)}
                        >
                          리뷰 쓰기
                        </button>
                      )}
                      {submittedReview[reservation.timetableId] === false && (
                        <div className="reviewModal">
                          <Review
                            movieId={reservation.movieId}
                            timetableId={reservation.timetableId}
                            onSubmit={(data) =>
                              handleReviewSubmit(data, reservation.timetableId)
                            }
                            onClose={() => handleReviewClose(reservation.timetableId)}
                            color="white"
                          />
                        </div>
                      )}
                    </>
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
