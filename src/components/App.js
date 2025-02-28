import React from 'react';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';
import InputProblem from './InputProblem';
import Approach from './Approach';
import '../App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element ={<LandingPage />} />
        <Route path="/dashboard" element ={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;