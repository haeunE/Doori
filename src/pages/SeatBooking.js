import React, { useEffect, useState } from "react";
import "./css/SeatBooking.css";
import axiosInstance from "../axiosInstance";
import SeatRow from "../components/js/SeatRow";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const SeatBooking = () => {
// 앞에서 navigate로 정보 보내는 경우
  


  const location = useLocation();
  const timetableId = parseInt(location.state.value); // 타임테이블 id

  console.log(timetableId)

  // const timetableId = 1; // timetable - 임시데이터

  const [selectedSeats, setSelectedSeats] = useState([]); // 선택 좌석
  const [reservedSeats, setReservedSeats] = useState([]); // 예약된 좌석
  const [price, setPrice] = useState(""); // 가격
  const [loading, setLoading] = useState(false); // 로딩중
  const navigate = useNavigate(); // 페이지 이동
 
  const data = {price : price, timetableId : timetableId, seatNb : selectedSeats}

  // const reservedSeatsEX = ["A1", "A3", "B2"]; // 예약된 좌석 예시 - 임시데이터

  const seatLayout = [
    { row: "A", seats: [1, 2, 3, 4, 5] },
    { row: "B", seats: [1, 2, 3, 4, 5] },
    { row: "C", seats: [1, 2, 3, 4, 5] },
    { row: "D", seats: [1, 2, 3, 4, 5] },
  ];

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prev) => {
      const updatedSeats = prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId];
      // 가격을 계산하는 코드
      setPrice(7000 * updatedSeats.length);
      return updatedSeats;
    });
  };

  // 예약된 자석 정보들 가져와주는 것 필요
  useEffect(()=>{
    setLoading(true);
    axiosInstance.get('/doori/reservation/seats', {
      params : {timetableId : timetableId}
    })
      .then(response=>{
        console.log(response.data)
        setReservedSeats(response.data)
        setLoading(false)
      }).catch(error=>{
        console.log(error)
        setLoading(false)
      })
  }, [timetableId]);

  if(loading)
    return <div>로딩중</div> // 로딩중인 사진? 넣어도 됨
    return (
      <div className="seat-booking">
        <h1 className="screen">screen</h1>
        {seatLayout.map((row) => (
          <SeatRow
            key={row.row}
            rowNumber={row.row}
            seats={row.seats}
            reservedSeats={reservedSeats}
            selectedSeats={selectedSeats}
            handleSeatClick={handleSeatClick}
          />
        ))}
        <div className="selected-seats">
          <h2>선택한 좌석:</h2>
          {selectedSeats.length > 0 ? (
            selectedSeats.map((seat) => (
              <strong key={seat}>{seat}</strong>
            ))
          ) : (
            <strong>선택한 좌석이 없습니다.</strong>
          )}
          <h4>가격 : {price}</h4>
        </div>
        <button className="seat-btn"
         onClick={()=>{
          const isConfirmed = window.confirm("예매하시겠습니까?")
          if(isConfirmed){
            setLoading(true);
            console.log(data)// 확인용
            axiosInstance.post("/doori/booking", data)
            .then(response=>{
              console.log(response.data) // 확인용
              alert("예매가 완료되었습니다.");
              navigate("/doori") // 어디로 이동 시킬지 
            }).catch(error=>{
              console.log(error)
              alert("예매에 실패했습니다. 다시 시도해 주세요");
            })
            .finally(()=> setLoading(false));
          }else{
            alert("예매 취소 되었습니다.")
            navigate("/doori")
          }
         }}
        >
          선택완료
        </button>
      </div>
    );
};

export default SeatBooking;
