import React from 'react';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import InputProblem from './InputProblem';
import Strategy from './Strategy';
import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='min-h-screen bg-[#C2C8C5]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<LandingPage />} />
          <Route path='/dashboard' exact element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
