import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import './css/UserVerify.css';

function UserVerify() {
    const [password, setPassword] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    const onChangeHandler = (e) => {
        setPassword(e.target.value);
    };

    const handleVerify = () => {
        if (!password) {
            alert("비밀번호를 입력하세요.");
            return;
        }

        axiosInstance
            .post("/doori/userverify", { password })
            .then((response) => {
                alert("비밀번호 검증 성공");

                const jwt = response.headers['Authorization'];
                
                if (jwt) {
                    sessionStorage.setItem("jwt", jwt);
                    setIsAuth(true);
                    navigate("/doori/userupdate");
                }
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    alert("비밀번호를 확인해주세요.");
                } else {
                    alert("알 수 없는 오류가 발생했습니다.");
                }
                console.log(error);
            });
    };

    return (
        <div className="UserVerify">
            <strong>비밀번호: <input type="password" name="password" onChange={onChangeHandler} /></strong>
            <button onClick={handleVerify}>
                정보 확인 / 수정
            </button>
        </div>
    );
}

export default UserVerify;
