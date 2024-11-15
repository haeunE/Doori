import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

function Header({isAuth, setIsAuth, setUserInfo}) {
  const [search, setSearch] = useState(""); // 검색어 저장 state
  

  function changeSearchHandler(e) {
    setSearch(e.target.value);
  }

  function handleSearchClick() {
    console.log("검색어:", search);
    // 실제 검색 로직을 여기에 추가 필요
  }

  // function logout(){
  //   sessionStorage.removeItem('jwt'),
  //   setIsAuth(false),
  //   setUserInfo()
  // }

  return (
    <div className="Header">
      <button className="sidebar">sidebar</button>
      <Link to="/doori">
        <img src="/img/logo_header.png" alt="doorimain" />
      </Link>

      <div className="left-section">
        <div className="links-container">
          {isAuth ? (
            <>
              <Link to="/doori/userInfo" className="auth-link">내정보</Link>
              <Link to="/doori/logout" className="auth-link"/*onClick={logout}*/>로그아웃</Link>
            </>
          ) : (
            <>
              <Link to="/doori/login" className="auth-link">로그인</Link>
            </>
          )}
        </div>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={search}
            onChange={changeSearchHandler}
          />
          <button className="search" onClick={handleSearchClick}>
            검색
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
