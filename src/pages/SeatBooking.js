// SeatBooking.js
import React, { useEffect, useState } from "react";
import "./css/SeatBooking.css";
import axiosInstance from "../axiosInstance";
import SeatRow from "../components/js/SeatRow";
import { useLocation, useNavigate } from "react-router-dom";

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
 // timetable정보 받아올거임 -> reservationNB생성 해야됨 (가격=티켓*자리ea) -> reservaionNB보내줘야됨
 // -> reNB & seatNB이용해서 저장 필요함 어떻게

 // 해결방법 - 함수 2개 만들어서 onclick했을때 할건데 어싱크 어웨잇으로 해야될거 같음
  const reservedSeatsEX = ["A1", "A3", "B2"]; // 예약된 좌석 예시

  const seatLayout = [
    { row: "A", seats: [1, 2, 3, 4, 5] },
    { row: "B", seats: [1, 2, 3, 4, 5] },
    { row: "C", seats: [1, 2, 3, 4, 5] },
    { row: "D", seats: [1, 2, 3, 4, 5] },
  ];

  const handleSeatClick = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId)
        ? prev.filter((seat) => seat !== seatId)
        : [...prev, seatId]
    );
  };

  useEffect(() => {
    console.log("Selected seats updated:", selectedSeats);
  }, [selectedSeats]);

  // useEffect(()=>{
  //   axiosInstance.get('/doori/reservation/seats')
  //     .then(response=>{
  //       console.log(response.data)
  //       setReservedSeats([...reservedSeats,...response.data])
  //       setLoading(false)
  //     }).catch(error=>{
  //       console.log(error)
  //     })
  // }, [])

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
            reservedSeats={reservedSeatsEX}
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
        </div>
        <button
        //  onClick={()=>{
        //   const isConfirmed = window.confirm("예매하시겠습니까?")
        //   if(isConfirmed){
        //     axiosInstance.post("/doori/reservation")
        //     .then(response=>{
        //       console.log(response.data)
        //     }).catch(error=>{
        //       console.log(error)
        //     })
        //   }else{
        //     alert("예매 취소 되었습니다.")
        //     navigate("/doori")
        //   }
          
        //  }}
        >
          선택완료
        </button>
      </div>
    );
};

export default SeatBooking;
