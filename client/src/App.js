import logo from './logo.svg';
import './App.css';
import LandingPage from './pages/LandingPage';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
    </Routes>


  );
}

export default App;
