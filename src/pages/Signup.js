import { useEffect, useState } from "react";
import './css/Signup.css'

// 수정사항 : useState, useEffect 코드 간결하게 수정

function Signup() {
const[member, setMember] = useState({
    username : '',
    password : '',
    name : '',
    tel : '',
    email: ''
  })

  const onChangeHandler = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    })
  }



    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // const [name, setName] = useState('');
    // const [tel, setTel] = useState('');
    // const [email, setEmail] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [nameError, setNameError] = useState('');
    const [telError, setTelError] = useState('');
    const [emailError, setEmailError] = useState('');

    const [agree, setAgree] = useState(false);


    // 아이디 (중복 사용불가)
    const usernameCheckHandler = async (username) => {
        if (username === '') {
            setUsernameError('아이디를 입력해주세요.');
            return false;
        }
        const responseData = await usernameDuplicateCheck(username);
        if (responseData) {
            setUsernameError('이미 사용 중인 아이디입니다.');
            return true;
        } else {
            setUsernameError('사용 가능한 아이디입니다.');
            return false;
        }
    }

    // 아이디 중복 체크 (서버에 요청)
    const usernameDuplicateCheck = async (username) => {
        try {
            const response = await fetch('/api/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            });

            const data = await response.json();
            return data.isAvailable;
        } catch (error) {
            console.error('아이디 중복 확인 실패:', error);
            return false;
        }
    }
    // 비밀번호
    const passwordCheckHandler = (password) => {
        const passwordRegex = /^[a-z\d!@*&-_]{8,}$/;

        if (!passwordRegex.test(password)) {
            setPasswordError('비밀번호는 8자 이상, 영소문자, 숫자, 특수 문자 !@*&-_ 입력 가능합니다.');
            return false;
        } else {
            setPasswordError('');
            return true;
        }
    }

    useEffect(() => {
        passwordCheckHandler(password)
    }, [password])


    // 성함
    const nameCheckHandler = (name) => {
        const nameRegex = /^[가-힣]+$/;

        if (!nameRegex.test(name)) {
            setNameError('한글만 입력 가능합니다.');
            return false;
        } else {
            setNameError('');
            return true;
        }
    }

    useEffect(() => {
        nameCheckHandler(name)
    }, [name])



    // 전화번호
    const telCheckHandler = (tel) => {
        const telRegex = /^\d{11}$/;
        if (!telRegex.test(tel)) {
            setTelError('숫자 11자만 입력 가능합니다.');
            return false;
        } else {
            setTelError('');
            return true;
        }
    }

    useEffect(() => {
        telCheckHandler(tel)
    }, [tel])


    // 이메일(메일 형식)
    const emailCheckHandler = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            setEmailError('메일 형식으로 입력해주세요. ex) doori@example.com');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    }

    useEffect(() => {
        emailCheckHandler(email)
    }, [email])

    //회원가입 요청을 서버에 전송
    const signupHandler = async (e) => {
        e.preventDefault();

        const usernameCheckResult = await usernameCheckHandler(username);
        if (usernameCheckResult) return;

        const passwordCheckResult = passwordCheckHandler(password);
        if (!passwordCheckResult) return;

        const isFormValid = [
            usernameError,
            passwordError,
            nameError,
            telError,
            emailError
        ].every((error) => error === '');

        console.log(isFormValid);

        if (!isFormValid) {
            alert('회원 가입 정보를 확인해주세요.');
            return;
        }

        if (!agree) {
            alert('개인정보 수집에 동의해주세요.');
            return;
        }

        try {
            const responseData = await fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, name, tel, email }),
            });

            const data = await responseData.json();
            if (data.success) {
                alert('회원가입이 정상 처리되었습니다!');
            } else {
                alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
            console.error(error);
        }
    }

    return (
        <div className="Signup" id="Signup">
            <form onSubmit={signupHandler}>
                <div className="inputContainer" id="inputContainer">
                    <label>
                        아이디: <input
                            type="username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                                usernameCheckHandler(e.target.value);
                            }} />
                    </label>
                    <div>{usernameError}</div>
                    <br />

                    <label>
                        비밀번호: <input
                            type="password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                passwordCheckHandler(e.target.value);
                            }} />
                    </label>
                    <div>{passwordError}</div><br />

                    <label>
                        이름: <input
                            type="name"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                nameCheckHandler(e.target.value);
                            }} />
                    </label>
                    <div>{nameError}</div><br />

                    <label>
                        전화번호: <input
                            type="tel"
                            value={tel}
                            onChange={(e) => {
                                setTel(e.target.value);
                                telCheckHandler(e.target.value);
                            }} />
                    </label>
                    <div>{telError}</div><br />

                    <label>
                        이메일: <input
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                emailCheckHandler(e.target.value);
                            }} />
                    </label>
                    <div>{emailError}</div><br />
                </div>

                <label>
                    개인정보수집동의 <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                </label>

                <div>
                    <button type="submit" className="btn-join" id="btn-join">회원가입</button>
                </div>
            </form>
        </div>
    )
}

export default Signup;
