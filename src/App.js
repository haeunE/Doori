import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Header from './components/main/Header';
import Footer from './components/main/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/'/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
