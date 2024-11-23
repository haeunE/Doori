import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance";
import './css/Myreservation.css';

function Myreservation() {
  const [reservationList, setReservationList] = useState([]);
  const [loading, setLoading] = useState(true);

  // 티켓당 가격 (7,000원으로 수정)
  const ticketPrice = 7000;

  useEffect(() => {
    axiosInstance
      .get("/doori/myreservation")
      .then(response => {
        console.log(response.data); // 응답 데이터를 확인
        // 날짜 기준 내림차순 정렬
        const sortedReservations = response.data.sort((a, b) => {
          // 예약 날짜를 비교하여 내림차순으로 정렬
          return new Date(b.movieDate) - new Date(a.movieDate);
        });
        setReservationList(sortedReservations); // 정렬된 데이터 상태로 설정
        setLoading(false);
      })
      .catch(error => {
        console.error("예약 정보를 가져오는 중 오류가 발생했습니다: ", error);
        setLoading(false); // 오류 발생 시 로딩 상태 종료
      });
  }, []); // 빈 배열을 넣어 한 번만 실행되도록 함

  if (loading) {
    return <div>로딩중...</div>; // 로딩 중일 때 표시
  }

  // 예약이 없을 경우 처리
  if (reservationList.length === 0) {
    return <div className="noReservationMessage">예약이 없습니다.</div>; // 예약이 없는 경우 메시지 표시
  }

  // 상영일이 하루 이상 지난 경우 true 반환하는 함수
  const isReviewTime = (movieDate) => {
    const now = new Date();
    const showDate = new Date(movieDate);
    const diffInTime = now - showDate; // 밀리초 차이
    const diffInDays = diffInTime / (1000 * 3600 * 24); // 차이를 일수로 계산
    return diffInDays >= 1; // 하루 이상 지났으면 true
  };

  return (
    <div className="Myreservation">
      <ul>
        {reservationList.map((reservation, index) => {
          // 좌석 수 계산
          const seatCount = reservation.seatNm.length;
          // 결제 금액 계산 (좌석 수 * 티켓당 가격)
          const totalPrice = seatCount * ticketPrice;

          return (
            <li key={reservation.reservationId || index} className="reservationItem">
              {/* 영화 포스터 */}
              <div className="movieCard">
                <img
                  className="poster"
                  src={reservation.moviePoster || "/img/non_img.png"} // 포스터가 없으면 기본 이미지 표시
                  alt="Movie Poster"
                />
              </div>
              {/* 영화 정보 표시 */}
              <div className="movieInfo">
                <p className="title">{reservation.title}</p>
                <p className="date-time">상영일: {new Date(reservation.movieDate).toLocaleString()}</p>
                <p className="reservedSeat">좌석 번호: {reservation.seatNm.join(", ")}</p>
                <p className="price">결제 금액: {totalPrice.toLocaleString()} 원</p>

                {/* 버튼들 */}
                <div className="buttonContainer">
                  {/* 상영일이 하루 이상 지나지 않았으면 "예약 취소" 버튼 */}
                  {!isReviewTime(reservation.movieDate) ? (
                    <button className="cancelButton">예약 취소</button>
                  ) : (
                    // 하루 이상 지났으면 "리뷰 쓰기" 버튼
                    <button className="reviewButton">리뷰 쓰기</button>
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
