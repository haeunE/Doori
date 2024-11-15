import { useState } from "react";
import "./css/Movies.css"
import Cards from "../components/js/Cards.js";

function Movies() {
  const [movieList, setMovieList] = useState([
    {
      link:"/login",
      img : "/img/비긴어게인.png",
      title : "비긴어게인",
      top : 34,
      rated : "/icons/all_icon.svg"
    },
    {
      link:"/login",
      img : "/img/비긴어게인.png",
      title : "비긴어게인",
      top : 34,
      rated : "/icons/all_icon.svg"
    },
    {
      link:"/login",
      img : "/img/비긴어게인.png",
      title : "비긴어게인",
      top : 34,
      rated : "/icons/all_icon.svg"
    },
    {
      link:"/login",
      img : "/img/비긴어게인.png",
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
  return (
    <div className='movies'>
      <h1>Movies</h1>
      <Cards list={movieList}/>
    </div>
  );
}
export default Movies;