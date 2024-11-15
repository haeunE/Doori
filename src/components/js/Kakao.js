import KakaoLogin from "react-kakao-login";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../axiosInstance";

function Kakao({setIsAuth}){
  const navigate = useNavigate();

  const responseKakao = (response) => {
    console.log(response)
    axiosInstance.post('/doori/login/kakao',{
      username:response.profile.properties.nickname
    }).then(response =>{
      const jwt = response.headers.authorization;
      console.log(jwt)
      if(jwt != null){
        sessionStorage.setItem('jwt',jwt)
        setIsAuth(true)

        navigate("/doori")
      }
    }).catch(error =>{
      console.log(error)
    })
  }

  return(
    <>
      <KakaoLogin
        token="3f807313d6b0be9ee9aa13c99c5062a3"
        onSuccess={responseKakao}
        onFail={()=>console.log("로그인 실패")}
      />
    </>
  )
}

export default Kakao