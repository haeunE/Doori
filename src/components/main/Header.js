import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";

function Header({ isAuth, setIsAuth, setUserInfo }) {
  const [search, setSearch] = useState(""); // 검색어 저장 state


  function changeSearchHandler(e) {
    setSearch(e.target.value);
  }

  function handleSearchClick() {
    console.log("검색어:", search);
    // 실제 검색 로직을 여기에 추가 필요
  }

  function logout() {
    sessionStorage.removeItem('jwt');
    setIsAuth(false);
    setUserInfo()
  }

  return (
    <div className="Header">
      <div className="Nav">
        <Navbar expand={false} className="bg-body-tertiary mb-3" variant="dark">
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="start"
            >
              <Offcanvas.Header closeButton className="offHeader">
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>

              {/* 메뉴 제목 아래에 줄 추가 */}
              <hr className="menu-divider" />

              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3 navList">
                  <strong>
                    <Nav.Link href="#action1">무-비</Nav.Link>
                    <Nav.Link href="#action2">예매</Nav.Link>
                    <Nav.Link href="#action3">예매 내역</Nav.Link>
                    <Nav.Link href="#action4">관람평</Nav.Link>
                  </strong>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      </div>
      <Link to="/doori">
        <img src="/img/logo_header.png" alt="doorimain" />
      </Link>

      <div className="left-section">
        <div className="links-container">
          {isAuth ? (
            <>
              <Link to="/doori/userverify" className="auth-link">내정보</Link>
              <Link to="/doori/logout" className="auth-link" onClick={logout}>로그아웃</Link>
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
            {/* SVG 아이콘 추가 */}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
