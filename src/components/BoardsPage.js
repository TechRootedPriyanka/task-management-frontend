// BoardsPage.js

import React, { useState, useEffect } from 'react';
import Header from './Header';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const BoardsPage = () => {
  // Define state to hold the list of boards
  const [boards, setBoards] = useState([]);

  // Fetch the list of boards from your backend API
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const response = await fetch('http://localhost:3000/boards');
        if (response.ok) {
          const data = await response.json();
          setBoards(data);
        } else {
          console.error('Failed to fetch boards:', response.statusText);
        }
      } catch (error) {
        console.error('Failed to fetch boards:', error.message);
      }
    };

    fetchBoards();
  }, []);

  return (
    <>
      <Header />
      <div>
        <Typography variant="h3">Boards</Typography>
        <ul>
          {boards.map((board) => (
            <li key={board.id}>
              <Link to={`/boards/${board.id}`}>{board.title}</Link>
            </li>
          ))}
        </ul>
        <Button component={Link} to="/create-board" variant="contained" color="primary">
          Create New Board
        </Button>
      </div>
    </>
  );
};

export default BoardsPage;
