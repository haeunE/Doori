import { useEffect, useState } from "react"
import "../css/MovieDetail.css"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../axiosInstance";
import ReadReviews from "./ReadReviews";

function MovieDetail(){
  const [movie, setMovie] = useState([])
  const { id } = useParams();
  const [loading , setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("summary");
  const navigate = useNavigate();

  useEffect(()=>{
    axiosInstance
    .get(`/doori/movies/${id}`)
    .then((response) => {
      if (response.status === 200) {
        console.log(response.data); // 서버에서 전달된 Map 데이터 확인
        setMovie(response.data); // movie 데이터 상태 업데이트
        setLoading(false); // 로딩 상태 해제
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        console.log("Movie not found");
      } else {
        console.error("An error occurred:", error);
      }
    });
  }, [id]); // id 의존성 추가

  const nowReservation = ()=>{
    console.log(movie.id)
    navigate("/doori/reservation",{state:{value:movie.id}})
  }


  if (loading)
    return <div>로딩중</div>


  return(
    <div className="detail__container">
      <div className="detail__items">
        <div className="detail__items__details">
          <div className="detail__items__img">
            <img
              className="detail__items__poster"
              alt="Poster"
              src={movie.moviePoster} // 여기에 포스터 이미지 URL 추가
            />
          </div>
          <div className="detail__items__info">
            <h5 className="detail__items__title">{movie.title}</h5>
            <p className="detail__items__short">
              {movie.releaseDte}개봉 | {movie.runningtime}분 | {movie.ratedYn=="all"?"전체관람가":movie.ratedYn} | 예매율 30%
            </p>
            <ul className="detail__items__long">
              <li>장르&nbsp;|&nbsp;{movie.genre}</li>
              <li>감독&nbsp;|&nbsp;{movie.director}</li>
              <li>출연&nbsp;|&nbsp;{movie.actor}</li>
            </ul>
            <button className="detail__items__btn" onClick={nowReservation}>예매하기</button>
          </div>
        </div>

        {/* 탭 레이아웃 */}
        <div className="detail__items__layout">
          {/* 탭 메뉴 */}
          <div className="tabs">
            <button
              className={`tab ${activeTab === "summary" ? "active" : ""}`}
              onClick={() => setActiveTab("summary")}
            >
              줄거리
            </button>
            <button
              className={`tab ${activeTab === "reviews" ? "active" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              관람평
            </button>
          </div>

          {/* 탭 내용 */}
          <div className="tab__content">
            {activeTab === "summary" && (
              <div className="detail__summary">
                <h6>줄거리</h6>
                <p>{movie.plot || "줄거리 정보가 없습니다."}</p>
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="detail__reviews">
                <h6>관람평</h6>
                <ReadReviews where={`movies/${movie.id}`}/>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  
  )
}
export default MovieDetail;