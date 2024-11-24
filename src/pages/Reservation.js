import { useEffect, useState } from "react"
import Cards from "../components/js/Cards"
import axiosInstance from "../axiosInstance"
import WeekDays from "../components/js/WeekDays"
import SmallCard from "../components/js/SmallCard";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

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

  const [screenTimetable,setScreenTimetable]= useState([]) //시간표 시간표id 월,시간 영화id(영화정보)
  const [screenMovies, setScreenMovies] = useState([]) //상영영화 영화id(영화정보)
  
  const [filterMovieId, setFilterMovieId] = useState();
  const [selectSmallCard, setSelectSmallCard] = useState(
    {
      timeid:null,
      time:null,
      title:null
    }
  );
  const navigate = useNavigate();
  const location = useLocation();
  const nowMovieid = location.state?.value || null;
  
  const findByMovies = ()=>{
    const filterscreen = screenMovies.filter(movie=>movie.id===filterMovieId);
    console.log(filterscreen)
    if(!filterscreen){
      setScreenMovies()
      console.log("해당 날짜에 없음")
      return;
    }
    console.log("해당 날짜에 있음")
    setScreenMovies(filterscreen)
    return;
  }
  
  
  useEffect(()=>{
    console.log(nowMovieid)
    axiosInstance.get('/doori/reservation')
      .then(response =>{
        setMovieList([...movieList,...response.data])
        setLoading(false)
        if (nowMovieid){
          setFilterMovieId(nowMovieid) //2
        }      
      }).catch(error =>{
        console.log(error)
      })
  },[])

  
  
  useEffect(()=>{
    axiosInstance.post('/doori/reservation',{ String : selectedDate.fullDate })
      .then(response =>{
        
        console.log(response.data)
        // 응답 데이터를 screenTimetable에 설정
        setScreenTimetable(response.data);  
        // screenMovies를 업데이트
        const newScreenMovies = response.data.flatMap(dayMovie => dayMovie.movieId); //movieid(...)
        console.log(newScreenMovies)
        // console.log(newScreenMovies)

        // 필터처리
        if(filterMovieId!=null){
          findByMovies();
          console.log(screenMovies)
        }
        else{
          setScreenMovies(newScreenMovies);
          console.log("온전한 데이터" )
          console.log(screenMovies)
        }

        console.log("Updated screenTimetable:", response.data);
        console.log("Updated screenMovies:", newScreenMovies);

        
      }).catch(error =>{
        console.log(error)
        console.log(selectedDate.fullDate)
      })
  },[selectedDate])

  
  useEffect(() => {
    console.log(filterMovieId)
    if(!filterMovieId) {
      setScreenMovies(screenTimetable.flatMap(dayMovie => dayMovie.movieId))
      console.log("3"+{screenMovies})
      return;
    }
    setScreenMovies(screenMovies.filter(movie=>movie.id==filterMovieId))
    console.log("2:"+{screenMovies})

  },[filterMovieId])

  useEffect(() => {
    if (selectSmallCard.timeid === null) {
      return;
    } else {
      if (
        window.confirm(
          `해당 시간대로 예매하시겠습니까?\n 시간: ${selectSmallCard.time}\n 영화: ${selectSmallCard.title}`
        )
      ) {
        navigate("/doori/seatbooking", { state: { value: selectSmallCard.timeid } });
      } else {
        setSelectSmallCard({ timeid: null, time: null, title: null });
      }
    }
  }, [selectSmallCard]);

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
      <Cards list={transformedList} align="no-wrap" setFilterMovieId={setFilterMovieId} filterMovieId={filterMovieId} />
      <WeekDays weekDays={weekDays} selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      {
        screenMovies.map((movie, j) => {
          return (
            <>
            <h5 className="screen__time">{screenTimetable[j].movieDate.substring(11,16)}</h5>
            {console.log(screenTimetable[j].id)}
            <SmallCard
              key={j}
              ratedYn={"/icons/"+String(movie.ratedYn).substring(0,3)+"_icon.svg"}
              title={movie.title}
              start_h={
                screenTimetable[j]?.movieDate
                  ? parseInt(screenTimetable[j].movieDate.substring(11, 13), 10) // 10진수로 변환
                  : 0 // 기본값 설정
                // screenTimetable[j].movieDate
              }
              start_m={
                screenTimetable[j]?.movieDate
                  ? parseInt(screenTimetable[j].movieDate.substring(14, 16),10)
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
              screenTimetableId={screenTimetable[j].id}
              selectSmallCard={selectSmallCard}
              setSelectSmallCard={setSelectSmallCard}
            />
            </>
          )
        })
      }
    </div>
  )
}
export default Reservation