import { useEffect, useState } from "react"
import Cards from "../components/js/Cards"
import axiosInstance from "../axiosInstance"
import WeekDays from "../components/js/WeekDays"
import SmallCard from "../components/js/SmallCard";

function Reservation(){
  // 오늘 날짜를 기준으로 일주일 데이터 생성
  const getWeekDays = () => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(today.getDate() + i);
      return {
        fullDate: date.toISOString().split("T")[0], // YYYY-MM-DD
        day: date.getDate(), // DD
        month: date.getMonth() + 1, // MM (1~12)
        weekday: date.toLocaleDateString("ko-KR", { weekday: "short" }), // 요일 (e.g., "월", "화")
      };
    });
  };

  

  const [weekDays] = useState(getWeekDays()) //날짜 데이터
  const [movieList, setMovieList] = useState([]) // 모든 영화 데이터
  const [loading , setLoading] = useState(true) // 로딩 상태
  const [selectedDate, setSelectedDate] = useState(weekDays[0]); // Default: 오늘

  const [timeTable,setTimeTable]= useState([]) //시간표 시간표id 월,시간 영화id(영화정보)
  const [screenMovies, setScreenMovies] = useState([]) //상영영화 영화id(영화정보)
  
  const [filterMovieId, setFilterMovieId] = useState();

  useEffect(()=>{
    axiosInstance.get('/doori/reservation')
      .then(response =>{
        setMovieList([...movieList,...response.data])
        setLoading(false)
      }).catch(error =>{
        console.log(error)
      })
  },[])
  useEffect(()=>{
    axiosInstance.post('/doori/reservation',{ String : selectedDate.fullDate })
      .then(response =>{

        // 응답 데이터를 timeTable에 설정
        setTimeTable(response.data);

        // screenMovies를 업데이트
        const newScreenMovies = response.data.flatMap(dayMovie => dayMovie.movieId);
        setScreenMovies(newScreenMovies);

        console.log("Updated timeTable:", response.data);
        console.log("Updated screenMovies:", newScreenMovies);
      }).catch(error =>{
        console.log(error)
        console.log(selectedDate.fullDate)
      })
  },[selectedDate])

  const [cardTf , setCardTf] = useState(false)

  
  useEffect(() => {
    if(!filterMovieId) {
      setScreenMovies(timeTable.flatMap(dayMovie => dayMovie.movieId))
      return;
    }

    setScreenMovies(screenMovies.filter(movie=>movie.id==filterMovieId))
  },[filterMovieId])

  if (loading)
    return <div>로딩중</div>

  // movieList 데이터를 변환하여 Cards에 전달
  const transformedList = movieList.map((movie) => ({
    link: "http://localhost:3000/doori/movies/"+movie.id,
    title: movie.title.slice(1),
    img: movie.moviePoster,
    icon: "/icons/"+String(movie.ratedYn).substring(0,3)+"_icon.svg",
    goto : true,
    id : movie.id
  }));


  return(
    <div className="Reservation">
      <Cards list={transformedList} align="no-wrap" cardTf={cardTf} setFilterMovieId={setFilterMovieId} filterMovieId={filterMovieId} />
      <WeekDays weekDays={weekDays} selectedDate={selectedDate} setSelectedDate={setSelectedDate} setFilterMovieId={setFilterMovieId}/>
      {
        screenMovies.map((movie, j) => {
          return (
            <>
            <h5 className="screen__time">{timeTable[j].movieDate.substring(11,16)}</h5>
            <SmallCard
              key={j}
              ratedYn={movie.ratedYn}
              title={movie.title}
              start_h={
                timeTable[j]?.movieDate
                  ? parseInt(timeTable[j].movieDate.substring(11, 13), 10) // 10진수로 변환
                  : 0 // 기본값 설정
                // timeTable[j].movieDate
              }
              start_m={
                timeTable[j]?.movieDate
                  ? parseInt(timeTable[j].movieDate.substring(14, 16),10)
                  : 0
              }
              end_h={
                movie.runningtime
                  ? Math.floor(parseInt(movie.runningtime, 10) / 60)
                  : 0
              }
              end_m={
                movie.runningtime
                  ? parseInt(movie.runningtime, 10) % 60
                  : 0
              }
              remainingSeats={10}
            />
            </>
          )
        })
      }
    </div>
  )
}
export default Reservation