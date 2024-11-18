import { useState } from "react";
import "./css/Movies.css"
import Cards from "../components/js/Cards.js";

function Movies() {
  const [movieList, setMovieList] = useState([
    {
      link:"/login",
      poster : "/img/비긴어게인.png",
      title : "비긴어게인",
      top : 34,
      rated : "/icons/all_icon.svg"
    },
    {
      link:"/login",
      poster : "/img/비긴어게인.png",
      title : "비긴어게인",
      top : 34,
      rated : "/icons/all_icon.svg"
    },
    {
      link:"/login",
      poster : "/img/비긴어게인.png",
      title : "비긴어게인",
      top : 34,
      rated : "/icons/all_icon.svg"
    },
    {
      link:"/login",
      poster : "/img/비긴어게인.png",
      title : "비긴어게인",
      top : 34,
      rated : "/icons/all_icon.svg"
    }
  ])
  // useEffect(()=>{
  //   axiosInstance.get('/movies')
  //     .then(response =>{
  //       console.log(response.data)
  //       setBoardList(response.data)
  //     }).catch(error =>{
  //       console.log(error)
  //     })
  // },[])
  // movieList 데이터를 변환하여 Cards에 전달
  const transformedList = movieList.map((movie) => ({
    link: movie.link,
    title: movie.title,
    img: movie.poster,
    num : movie.top+"%",
    some : "예매율",
    icon: movie.rated,
  }));

  return (
    <div className="movies">
      <h1>Movies</h1>
      <Cards list={transformedList} />
    </div>
  );
}
export default Movies;