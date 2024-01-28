// App.js
import "./App.css";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from "./components/SignupPage";
import LoginPage from "./components/LoginPage";
import BoardsPage from "./components/BoardsPage";
import UsersPage from "./components/UsersPage";
import HomePage from "./components/HomePage";
import CreateBoard from "./components/CreateBoard";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import BoardPage from "./components/BoardPage";
import AllTasks from "./components/AllTasks";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Initially logged in for demonstration
  console.log(isLoggedIn);
  const handleLogout = () => {
    setIsLoggedIn(false); // Update state to reflect logout
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:boardId" element={<BoardPage />} />
        <Route path="/create-board" element={<CreateBoard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/alltasks" element={<AllTasks />} />
        <Route path="/logout" element={<Logout onLogout={handleLogout} />} /> 
       
        {/* Other routes and components */}
      </Routes>
    </Router>
  );
}

export default App;
