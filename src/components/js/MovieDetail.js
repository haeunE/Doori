import { useState } from "react"

function MovieDetail(){
  useEffect(()=>{
    const [movie, setMovie] = useState([])
    axiosInstance.get(`/doori/movies/${id}`)
      .then(response =>{
        console.log(response.data)
        setMovie(response.data)
        console.log(movieList)
        setLoading(false)
      }).catch(error =>{
        console.log(error)
      })
  },[])

  
  if (loading)
    return <div>로딩중</div>

  return(
    <div className="MovieDetial">
      <div className="detail__">
        <h1>제목</h1>
        <div></div>
      </div>
    </div>
  )
}
export default MovieDetail;