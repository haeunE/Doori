import React  from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetail from './components/js/MovieDetail';
import UserUpdate from './pages/UserUpdate';
import UserVerify from './pages/UserVerify';
import Test from './utils/Test';
import SeatBooking from './pages/SeatBooking';
import MyReviews from './pages/MyReviews';


import Myreservation from './pages/Myreservation';
import Reservation from './pages/Reservation';
import Review from './components/js/Review';
import Introduce from './pages/Introduce';

function App() {
  const [isAuth, setIsAuth] = useState(false); // 유저 로그인 상태
  const [userInfo, setUserInfo] = useState(); // 유저 정보

  useEffect(()=>{
    if (sessionStorage.getItem('jwt')) {
      setIsAuth(true); // 로그인 상태
    } else {
      setIsAuth(false); // 로그아웃 상태
    }
  }, []);

  return (
    <div className="App">
      <Header isAuth={isAuth} setIsAuth={setIsAuth} 
      userInfo={userInfo} setUserInfo={setUserInfo}/>
      <Routes>
        {/* 회원정보에 대한 route */}
        <Route path='/doori' element={<Home />}/>
        <Route path='/doori/signup' element={<Signup />}/>
        <Route path='/doori/login' element={<Login setIsAuth={setIsAuth}/>} />
        <Route path='/doori/userupdate' element={<UserUpdate setIsAuth={setIsAuth}/>}/>
        <Route path='/doori/reservation' element={<Reservation setIsAuth={setIsAuth}/>}/>
        <Route path='/doori/userverify' element={<UserVerify setIsAuth={setIsAuth}/>}/>
        <Route path='/doori/introduce' element={<Introduce />}/>
        {/* 임시 route */}

        {/* 영화 정보에 대한 route */}
        <Route path='/doori/movies' element={<Movies setIsAuth={setIsAuth}/>}/>
        <Route path="/doori/movies/:id" element={<MovieDetail />} />

        {/* 예약 관한 route */}
        <Route path='/doori/seatbooking' element={<SeatBooking isAuth={isAuth}/>} />
        <Route path='/doori/myreservation' element={<Myreservation />} />

        {/* 리뷰에 대한 route */}
        <Route path='/doori/myreviews' element={<MyReviews />}/>
        <Route path='/doori/test' element={<Test setIsAuth={setIsAuth}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
