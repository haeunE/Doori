import { useState } from "react"
import Banner from "../components/js/Banner"
import "./css/Home.css"
import TimeTable from "./TimeTable"
function Home(){

  const [eventImg,setEventimg] = useState([
    "https://mblogthumb-phinf.pstatic.net/MjAyMTEwMjlfMTg2/MDAxNjM1NDQ0NDIxNDUw._cGO1sS8xW-CltPUOYiHRbF3PIUSnj-pG2qnnkPN2bUg.Yg43WU-eSCBZ9whug5Wc-tMdnB65HBv-_pZKvXBQpOAg.JPEG.love90myself/Dune-Movie-Official-Poster-banner-feature.jpg?type=w800",
    "https://pbs.twimg.com/media/D2jSGe2WwAAymAW?format=jpg&name=large",
    "https://media.istockphoto.com/id/1255069266/ko/%EB%B2%A1%ED%84%B0/%EA%B3%B5%EC%83%81-%EA%B3%BC%ED%95%99-%EC%98%81%ED%99%94-%EC%B6%95%EC%A0%9C-%EB%B0%B0%EB%84%88.jpg?s=1024x1024&w=is&k=20&c=glIw_tK9YqGjZDgRPbu43De9cUUdozMxBeaW7N-h95c="
  ])
  return(
    <div className="Home">
      <Banner images={eventImg}/>
      <TimeTable />
    </div>
  )
}

export default Home