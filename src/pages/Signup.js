import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './css/Signup.css';
import axiosInstance from "../axiosInstance";

function Signup() {
    const [member, setMember] = useState({
        username: '',
        password: '',
        passwordCheck: '',
        name: '',
        tel: '',
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [agree, setAgree] = useState(false);
    const [usernameAvailable, setUsernameAvailable] = useState(null); // 중복 확인 상태
    const [passwordChk, setPasswordChk] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'username') {
            setUsernameAvailable(null);
        }

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
        const errorMessages = {
            username: '아이디를 입력하세요.',
            password: '비밀번호를 입력하세요.',
            name: '이름을 입력하세요.',
            tel: '전화번호를 입력하세요.',
            email: '이메일을 입력하세요.'
        };

        const regexes = {
            username: /^[A-Za-z0-9]{5,50}$/,
            password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,30}$/,
            name: /^[A-Za-z가-힣]{1,10}$/,
            tel: /^\d{11}$/,
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        };

        let error = '';

        if (value === '') {
            error = errorMessages[name] || '';
        } else if (regexes[name] && !regexes[name].test(value)) {
            if (name === 'username') error = '아이디는 영문 또는 숫자, 5자 이상 50자 이하로 입력하세요.';
            else if (name === 'password') error = '비밀번호는 8~30자, 하나 이상의 영문과 숫자를 포함해야 합니다.';
            else if (name === 'name') error = '이름은 한글 또는 영문, 10자 이하로 입력하세요.';
            else if (name === 'tel') error = '전화번호는 11자리 숫자만 가능합니다.';
            else if (name === 'email') error = '유효한 이메일 형식을 입력하세요.';
        } else {
            error = '';
        }

        setErrors((prev) => ({ ...prev, [`${name}Error`]: error }));
        return !error;
    };

    useEffect(() => {
        const { username, password, passwordCheck, name, tel, email } = member;
        validateField('username', username);
        validateField('password', password);
        validateField('passwordCheck', passwordCheck);
        validateField('name', name);
        validateField('tel', tel);
        validateField('email', email);

        if (password === passwordCheck) {
            setPasswordChk(true);
        } else {
            setPasswordChk(false);
        }
    }, [member]);

    const checkUsernameAvailability = async () => {
        try {
            const response = await axiosInstance.post('/doori/usernamecheck', null, {
                params: { username: member.username }
            });

            if (response.status === 200) {
                setUsernameAvailable(true);
            } else {
                setUsernameAvailable(false);
            }
        } catch (error) {
            console.error('중복 확인 실패:', error);
            setUsernameAvailable(false);
        }
    };

    const signupHandler = async (e) => {
        e.preventDefault();

        if (Object.values(errors).some((error) => error !== '') || !agree || usernameAvailable === false) {
            alert('회원가입 정보를 확인해주세요.');
            return;
        }

        try {
            const responseData = await axiosInstance.post('/doori/signup', member);
            if (responseData.status === 200) {
                alert('회원가입이 성공했습니다!');
                navigate('/doori');
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('회원가입 실패:', error);
            alert(error.response.data);
        }
    };

    return (
        <div className="Signup">
            <form onSubmit={signupHandler}>
                <label>아이디:
                    <div className="inputWithButton">
                        <input
                            type="text"
                            name="username"
                            value={member.username}
                            onChange={handleChange}
                        />
                        <button type="button" onClick={checkUsernameAvailability}>중복 확인</button>
                    </div>
                </label>

                {errors.usernameError ? (errors.usernameError) : usernameAvailable !== null && (
                    usernameAvailable ? '사용 가능한 아이디입니다.' : '이미 사용 중인 아이디입니다.')}

                <label>비밀번호:
                    <input type="password" name="password" value={member.password} onChange={handleChange} />
                </label>
                <div>{errors.passwordError}</div>

                <label>비밀번호 확인:
                    <input type="password" name="passwordCheck" value={member.passwordCheck} onChange={handleChange}
                        onBlur={() => setPasswordChk(member.password === member.passwordCheck)} />
                    {!passwordChk && ('비밀번호가 일치하지 않습니다.')}
                </label>
                <div>{errors.passwordCheckError}</div>

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
                    <div className="agreeWrapper">
                        <input type="checkbox" name="agree" checked={agree} onChange={handleChange} />
                    </div>
                    <div>{!agree && <span style={{ color: 'red' }}>개인정보 수집 동의는 필수입니다.</span>}</div>
                </label>


                <button type="submit">회원가입</button>
            </form>
        </div>
    );
}

export default Signup;
