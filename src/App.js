import "./App.css";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import BoardsPage from "./components/BoardsPage";

// import LoginPage from './LoginPage'; // Assuming you have a LoginPage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        {/* Other routes and components */}
      </Routes>
    </Router>
  );
}

export default App;
