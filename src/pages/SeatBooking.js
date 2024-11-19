// SeatBooking.js
import React, { useEffect, useState } from "react";
import "./css/SeatBooking.css";
import axiosInstance from "../axiosInstance";
import SeatRow from "../components/js/SeatRow";

const SeatBooking = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
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
      </div>
    );
};

export default SeatBooking;
