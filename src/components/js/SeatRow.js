import Seat from "./Seat";
import "../css/SeatRow.css"

function SeatRow({rowNumber, seats, reservedSeats, selectedSeats, handleSeatClick}){
  return(
    <div className="seat-row">
      {seats.map((seat)=>{
        const seatId = `${rowNumber}${seat}`;
        const isReserved = reservedSeats.includes(seatId); // 좌석당 예약여부 확인
        const isSelected = selectedSeats.includes(seatId); // 좌석당 선택여부 확인

        return(
          <Seat 
           key={seatId}
           seatnumber={seatId}
           isReserved={isReserved}
           isSelected={isSelected}
           onClick={()=>{
            handleSeatClick(seatId);
           }
           }
          
          />
        )
      })}
    </div>

  )
}

export default SeatRow