import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './css/Signup.css';
import axiosInstance from "../axiosInstance";

function Signup() {
    const [member, setMember] = useState({
        username: '',
        password: '',
        name: '',
        tel: '',
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [agree, setAgree] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setAgree(checked);
        } else {
            setMember((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // 유효성 검사 함수
    const validateField = (name, value) => {
        let error = '';
        const regexes = {
            username: /.+/,
            password: /^[a-z\d!@*&-_]{8,}$/, 
            name: /^[가-힣]+$/,
            tel: /^\d{11}$/, 
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        };

        if (name === 'username' && !value) error = '아이디를 입력해주세요.';
        // else if (name === 'username' && !regexes.username.test(value)) error = '아이디는 영문과 숫자로만 입력 가능합니다.';
        else if (name === 'password' && !regexes.password.test(value)) error = '비밀번호는 8자 이상이어야 하며, 영문, 숫자, 특수문자만 가능합니다.';
        else if (name === 'name' && !regexes.name.test(value)) error = '이름은 한글만 입력 가능합니다.';
        else if (name === 'tel' && !regexes.tel.test(value)) error = '전화번호는 11자리 숫자만 가능합니다.';
        else if (name === 'email' && !regexes.email.test(value)) error = '유효한 이메일 형식을 입력해주세요.';

        setErrors((prev) => ({ ...prev, [`${name}Error`]: error }));
        return !error;
    };

    useEffect(() => {
        const { username, password, name, tel, email } = member;
        validateField('username', username);
        validateField('password', password);
        validateField('name', name);
        validateField('tel', tel);
        validateField('email', email);
    }, [member]);

    const signupHandler = async (e) => {
        e.preventDefault();

        if (Object.values(errors).some((error) => error !== '') || !agree) {
            alert('회원가입 정보를 확인해주세요.');
            return;
        }

        try {
            const responseData = await axiosInstance.post('/doori/signup', member);
            if (responseData.data.success) {
                alert('회원가입이 성공했습니다!');
                navigate('/doori');
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="Signup">
            <form onSubmit={signupHandler}>
                <div>
                    <label>아이디:
                        <input type="text" name="username" value={member.username} onChange={handleChange} />
                    </label>
                    <div>{errors.usernameError}</div>

                    <label>비밀번호:
                        <input type="password" name="password" value={member.password} onChange={handleChange} />
                    </label>
                    <div>{errors.passwordError}</div>

                    <label>이름:
                        <input type="text" name="name" value={member.name} onChange={handleChange} />
                    </label>
                    <div>{errors.nameError}</div>

                    <label>전화번호:
                        <input type="tel" name="tel" value={member.tel} onChange={handleChange} />
                    </label>
                    <div>{errors.telError}</div>

                    <label>이메일:
                        <input type="email" name="email" value={member.email} onChange={handleChange} />
                    </label>
                    <div>{errors.emailError}</div>

                    <label>
                        개인정보 수집 동의
                        <input type="checkbox" name="agree" checked={agree} onChange={handleChange} />
                    </label>
                    <div>{!agree && <span style={{ color: 'red' }}>개인정보 수집 동의는 필수입니다.</span>}</div>

                    <button type="submit">회원가입</button>
                </div>
            </form>
        </div>
    );
}

export default Signup;
