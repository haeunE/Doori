
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./css/Login.css"
import Kakao from "../components/js/Kakao"
import axiosInstance from "../axiosInstance"



function Login({setIsAuth}){
  const [user, setUser] = useState({
    username:"",
    password:""
  })
  const navigate = useNavigate();

  const onChangeHandler=(e)=>{
    setUser({
      ...user,
      [e.target.name] : e.target.value
    })
  }

  return(
    <div className="Login">
      <div className="loginInfo">
      <strong>ID:</strong> <input type="text" name="username" onChange={onChangeHandler}/><br/>
      <strong>password:</strong> <input type="text" name="password" onChange={onChangeHandler}/>
        <button onClick={()=>{
          axiosInstance.post("/doori/login", user)
          .then(reponse=>{
            // const jwt = reponse.headers.getAuthorization
            // if(jwt != null){
              //   sessionStorage.setItem('jwt',jwt),
              //   setIsAuth(true),
              //   navigate("/doori")
              // }
            }).catch(error=>{
              console.log(error)
            })
          }}>로그인</button>
        <div className="singupLink">
        <Link to="/doori/singup" className="link">회원가입</Link>
        </div>
      </div>
      <div className="socialLogin">
        <Kakao setIsAuth={setIsAuth}/>
        <div>구글</div>
      </div>
        
    </div>
  )
}

export default Login