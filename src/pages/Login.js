import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./css/Login.css"

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
        ID : <input type="text" name="username" onChange={onChangeHandler}/><br/>
        Password : <input type="text" name="password" onChange={onChangeHandler}/>
        <div className="singupLink">
        <Link to="/singup">회원가입</Link>
        </div>
        <button onClick={()=>{
          axios.post(`${process.env.REACT_APP_SERVER_URL}/login`, user)
          .then(reponse=>{
            // const jwt = reponse.headers.getAuthorization
            // if(jwt != null){
              //   sessionStorage.setItem('jwt',jwt),
              //   setIsAuth(true),
              //   navigate("/")
              // }
            }).catch(error=>{
              console.log(error)
            })
          }}>로그인</button>
      </div>
      <div className="socialLogin">
        <div>카카오</div>
        <div>구글</div>
      </div>
        
    </div>
  )
}

export default Login