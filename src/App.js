import React  from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Signup from './pages/Signup';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/'/>
        <Route path='/signup' element={<Signup />}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
