import { useEffect, useState } from "react";
import axiosInstance from "../axiosInstance"

function Test(){
  const [datas,setDatas] = useState()
  useEffect(()=>{
    axiosInstance.get('/doori/test')
    .then(response =>{
      console.log(response.data)
      setDatas(response.data)
      // setMovieList(response.data)
    }).catch(error =>{
      console.log(error)
    })
  },[])
  return(
    <div>
      <h1>JSON Data</h1>
      <pre>{JSON.stringify(datas, null, 2)}</pre>
    </div>
  )
}
export default Test;