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
import Test from './utils/Test';
import UserUpdate from './pages/UserUpdate';

function App() {
  const [isAuth, setIsAuth] = useState(false); // 유저 로그인 상태
  const [userInfo, setUserInfo] = useState(); // 유저 정보

  useEffect(()=>{
    if(sessionStorage.getItem('jwt'))
      setIsAuth(true)
  },[])

  return (
    <div className="App">
      <Header isAuth={isAuth} setIsAuth={setIsAuth} 
      userInfo={userInfo} setUserInfo={setUserInfo}/>
      <Routes>
        <Route path='/doori' element={<Home />}/>
        <Route path='/doori/signup' element={<Signup />}/>
        <Route path='/doori/login' element={<Login setIsAuth={setIsAuth}/>} />
        <Route path='/doori/movies' element={<Movies setIsAuth={setIsAuth}/>}/>
        <Route path='/doori/test' element={<Test setIsAuth={setIsAuth}/>}/>
        <Route path='/doori/userupdate' element={<UserUpdate setIsAuth={setIsAuth}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
