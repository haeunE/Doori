import { useEffect, useState } from "react";
import "./css/Movies.css"
import Cards from "../components/js/Cards.js";
import axiosInstance from "../axiosInstance"
import { useLocation } from "react-router-dom";

function Movies() {
  const [movieList, setMovieList] = useState([])
  const [loading , setLoading] = useState(true)
  const location = useLocation();
  const search_movie = location.state?.value || null;
  const [filteredMovies, setFilteredMovies] = useState([]);
  
  useEffect(()=>{
    axiosInstance.get('/doori/movies')
      .then(response =>{
        console.log(response.data)
        setMovieList([...movieList,...response.data])
        console.log(movieList)
        setLoading(false)
        console.log(search_movie)
      }).catch(error =>{
        console.log(error)
      })
  },[])
  useEffect(() => {
    if (search_movie) {
      const regex = new RegExp(search_movie, 'i');
      setFilteredMovies(
        movieList.filter(movie => regex.test(movie.title.slice(1)))
      );
    } else {
      setFilteredMovies(movieList); // 검색어가 없으면 전체 목록 표시
    }
  }, [search_movie, movieList]);

  
if (loading)
  return <div>로딩중</div>

  // movieList 데이터를 변환하여 Cards에 전달
  const transformedList = filteredMovies.map((movie) => ({
    link: window.location.href+"/"+movie.id,
    title: movie.title.slice(1),
    img: movie.moviePoster,
    num : "30"+"%",
    some : "예매율",
    icon: "/icons/"+String(movie.ratedYn).substring(0,3)+"_icon.svg",
    goto : false
  }));

  return (
    <div className="movies">
      <h1>Movies</h1>
      <Cards list={transformedList} />
    </div>
  );
}
export default Movies;