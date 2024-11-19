// - 4. **회원정보 수정/탈퇴**
//     - **수정 전 비밀번호 확인** 절차 필요
//     - **수정할 수 있는 항목**:
//         - 성함
//         - 이메일
//         - 전화번호
//     - **수정할 수 없는 항목**:
//         - 회원ID (PK)
//         - 가입날짜
//         - rolltype (USER)
//     - **수정 작업 처리**:
//         - **수정 취소**: 수정한 내용 모두 무효화되고 홈 화면으로 이동
//         - **수정 완료**:
//             - 수정 내용이 **user 객체 형식**에 맞는지 검사
//             - 형식이 맞지 않으면 **alert** 창 표시, 페이지 이동 없음
//             - 형식이 맞으면 DB에 업데이트 후 **홈 화면으로 이동**

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../axiosInstance";

function UserUpdate() {
    const [member, setMember] = useState({
        name: '',
        tel: '',
        email: '',
        password: '',
        currentPassword: ''
    });
    const [errors, setErrors] = useState({});
    const [agree, setAgree] = useState(false);
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
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

    // 비밀번호 확인 함수
    const validatePassword = async () => {
        try {
            const response = await axiosInstance.post("/doori/check-password", { password: member.currentPassword });
            if (response.data.isCorrect) {
                setIsPasswordCorrect(true);
            } else {
                setErrors((prev) => ({ ...prev, currentPasswordError: "비밀번호가 맞지 않습니다." }));
                setIsPasswordCorrect(false);
            }
        } catch (error) {
            console.error("비밀번호 확인 오류:", error);
            setErrors((prev) => ({ ...prev, currentPasswordError: "비밀번호 확인 중 오류가 발생했습니다." }));
        }
    };

    // 유효성 검사 함수
    const validateField = (name, value) => {
        const errorMessages = {
            name: '이름을 입력하세요.',
            tel: '전화번호를 입력하세요.',
            email: '이메일을 입력하세요.',
        };

        const regexes = {
            name: /^[A-Za-z가-힣]{1,10}$/,
            tel: /^\d{11}$/,
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        };

        let error = '';

        if (value === '') {
            error = errorMessages[name] || '';
        } else if (regexes[name] && !regexes[name].test(value)) {
            if (name === 'name') error = '이름은 한글 또는 영문, 10자 이하로 입력하세요.';
            else if (name === 'tel') error = '전화번호는 11자리 숫자만 가능합니다.';
            else if (name === 'email') error = '유효한 이메일 형식을 입력하세요.';
        } else {
            error = '';
        }

        setErrors((prev) => ({ ...prev, [`${name}Error`]: error }));
        return !error;
    };

    const updateHandler = async (e) => {
        e.preventDefault();

        if (!isPasswordCorrect || Object.values(errors).some((error) => error !== '') || !agree) {
            alert('회원정보를 확인해주세요.');
            return;
        }

        try {
            const responseData = await axiosInstance.post('/doori/update', member);
            if (responseData.status === 200) {
                alert('회원정보가 수정되었습니다.');
                navigate('/doori');
            } else {
                alert('회원정보 수정에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('회원정보 수정 실패:', error);
            alert('회원정보 수정에 실패했습니다. 다시 시도해주세요.');
        }
    };

    useEffect(() => {
        const { name, tel, email } = member;
        validateField('name', name);
        validateField('tel', tel);
        validateField('email', email);
    }, [member]);

    return (
        <div className="UserUpdate">
            <form onSubmit={updateHandler}>
                <div>
                    <label>현재 비밀번호:
                        <input type="password" name="currentPassword" value={member.currentPassword} onChange={handleChange} />
                    </label>
                    <div>{errors.currentPasswordError}</div>
                    <button type="button" onClick={validatePassword}>비밀번호 확인</button>

                    {isPasswordCorrect && (
                        <>
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

                            <button type="submit">수정 완료</button>
                        </>
                    )}

                    <button type="button" onClick={() => navigate("/doori")}>수정 취소</button>
                </div>
            </form>
        </div>
    );
}

export default UserUpdate;
