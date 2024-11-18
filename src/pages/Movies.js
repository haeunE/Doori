import { useEffect, useState } from "react";
import "./css/Movies.css"
import Cards from "../components/js/Cards.js";
import axiosInstance from "../axiosInstance"

function Movies() {
  const [movieList, setMovieList] = useState([])
  const [loading , setLoading] = useState(true)
  
  useEffect(()=>{
    axiosInstance.get('/doori/movies')
      .then(response =>{
        console.log(response.data)
        setMovieList([...movieList,...response.data])
        console.log(movieList)
        setLoading(false)
      }).catch(error =>{
        console.log(error)
      })
  },[])

  
if (loading)
  return <div>로딩중</div>

  // movieList 데이터를 변환하여 Cards에 전달
  const transformedList = movieList.map((movie) => ({
    link: "doori/movies/"+movie.id,
    title: movie.title,
    img: movie.moviePoster,
    num : "30"+"%",
    some : "예매율",
    icon: "/icons/"+String(movie.ratedYn).substring(0,3)+"_icon.svg"
  }));

  return (
    <div className="movies">
      <h1>Movies</h1>
      <Cards list={transformedList} />
    </div>
  );
}
export default Movies;