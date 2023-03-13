import React from 'react';
import NavBar from './navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PredictionPage from './predictionPage';
import TitleComponent from './about';
import Data from './data';
import Home from './home';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/prediction" element={<PredictionPage />} />
        <Route path="/data" element={<Data />} />
        <Route path="/about" element={<TitleComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
