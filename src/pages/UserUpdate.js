import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";
import "./css/Signup.css";

function UserUpdate() {
    const [user, setUser] = useState({
        username: sessionStorage.getItem("username") || "",
        name: "",
        newPassword: "",
        passwordCheck: "",
        tel: "",
        email: ""
    });
    const [errors, setErrors] = useState({});
    const [passwordChk, setPasswordChk] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const username = sessionStorage.getItem("username");
        setUser((prev) => ({ ...prev, username }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        const errorMessages = {
            newPassword: "비밀번호를 입력하세요.",
            passwordCheck: "비밀번호를 확인하세요.",
            name: "이름을 입력하세요.",
            tel: "전화번호를 입력하세요.",
            email: "이메일을 입력하세요."
        };

        const regexes = {
            name: /^[A-Za-z가-힣]{1,10}$/, // 이름 정규식
            newPassword: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/, // 비밀번호 정규식
            tel: /^\d{11}$/, // 전화번호 정규식
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ // 이메일 정규식
        };

        let error = "";

        if (value === "") {
            error = errorMessages[name];
        } else if (regexes[name] && !regexes[name].test(value)) {
            switch (name) {
                case "newPassword":
                    error = "비밀번호는 8~30자, 하나 이상의 영문과 숫자를 포함해야 합니다.";
                    break;
                case "name":
                    error = "이름은 한글 또는 영문, 10자 이하로 입력하세요.";
                    break;
                case "tel":
                    error = "전화번호는 11자리 숫자만 가능합니다.";
                    break;
                case "email":
                    error = "유효한 이메일 형식을 입력하세요.";
                    break;
                default:
                    error = "";
            }
        }

        setErrors((prev) => ({ ...prev, [`${name}Error`]: error }));
        return !error;
    };

    useEffect(() => {
        const { newPassword, passwordCheck } = user;
        setPasswordChk(newPassword === passwordCheck);
    }, [user.newPassword, user.passwordCheck]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = Object.keys(user).every((key) =>
            key === "passwordCheck" ? passwordChk : validateField(key, user[key])
        );

        if (!isValid || !passwordChk) {
            alert("회원 정보를 확인해주세요.");
            return;
        }

        axiosInstance
            .post("/doori/userupdate", user)
            .then(() => {
                alert("회원 정보 수정 완료");
                navigate("/doori");
            })
            .catch((error) => {
                console.error("회원 정보 수정 실패:", error);
                alert("회원 정보 수정 실패");
            });
    };

    return (
        <div className="Signup">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>아이디: {user.username}</label> <br />

                    <label>이름:
                        <input type="text" name="name" value={user.name} onChange={handleChange} />
                    </label>
                    {errors.nameError && <div style={{ color: "red" }}>{errors.nameError}</div>}

                    <label>새 비밀번호:
                        <input type="password" name="newPassword" value={user.newPassword} onChange={handleChange} />
                    </label>
                    {errors.newPasswordError && <div style={{ color: "red" }}>{errors.newPasswordError}</div>}

                    <label>새 비밀번호 확인:
                        <input type="password" name="passwordCheck" value={user.passwordCheck} onChange={handleChange} />
                    </label>
                    {!passwordChk && user.passwordCheck && (
                        <div style={{ color: "red" }}>비밀번호가 일치하지 않습니다.</div>
                    )}

                    <label>전화번호:
                        <input type="tel" name="tel" value={user.tel} onChange={handleChange} />
                    </label>
                    {errors.telError && <div style={{ color: "red" }}>{errors.telError}</div>}

                    <label>이메일:
                        <input type="email" name="email" value={user.email} onChange={handleChange} />
                    </label>
                    {errors.emailError && <div style={{ color: "red" }}>{errors.emailError}</div>}

                    <button type="submit">회원 정보 수정</button>
                </div>
            </form>
        </div>
    );
}

export default UserUpdate;
