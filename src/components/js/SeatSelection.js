import { useState } from "react"
import { SeatChart } from "react-seat-chart";

function SeatSelection(){

  const [seats, setSeats] = useState(new Array(40).fill(false));

  const handelSeatClick = (index) => {
    
  }

  return(
    <div>
      <h4>좌석선택</h4>
      <SeatChart 
        rows={5}
        colums={8}
        seats={seats}
        onSeatclick={handelSeatClick}
      />
    </div>
  )
}

export default SeatSelection