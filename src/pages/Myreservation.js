import { useEffect, useState } from "react"
import axiosInstance from "../axiosInstance"

function Myreservation(){
  const [reservationList, setReservationList] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axiosInstance.get("/doori/myreservations")
      .then(response=>{
        console.log(response.data)
        setLoading(false)
      }).catch(error=>{
        console.log(error)
      })
  },[])

  return(
    <div>

    </div>
  )
}

export default Myreservation