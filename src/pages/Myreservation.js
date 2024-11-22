import { useEffect, useState } from "react"
import axiosInstance from "../axiosInstance"

function Myreservation(){
  const [reservationList, setReservationList] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axiosInstance.get("/doori/myreservation")
      .then(response=>{
        console.log(response.data) // 확인
        setReservationList([...reservationList,...response.data])
        console.log(reservationList) // 확인
        setLoading(false)
      }).catch(error=>{
        console.log(error)
      })
  },[])

  if(loading)
    return <div>로딩중</div>

  return (
    <div className="Myreservation">
      {/* <div className="movieCard">
        <img
          className="poster"
          src={link} // 포스터 url
          alt="Movie Poster"
        />
      </div>

      <div className="movieInfo">
        <p className="title">제목: {title}</p>
        <p className="date-time">상영일: {date}</p>
        <p className="reservedSeat">좌석 번호: {reservedSeat}</p>
        <p className="price">결제 금액: {price} 원</p>
      </div> */}
    </div>
  );
}


export default Myreservation