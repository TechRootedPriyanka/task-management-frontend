// BoardsPage.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, Card, CardContent } from '@mui/material';
import firebaseApp from "./firebase";
import Header from './Header';

const BoardsPage = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetch boards from the database or any other source
    const fetchBoards = async () => {
      try {
        // Example: Fetch boards from Firebase
        const boardsSnapshot = await firebaseApp.firestore().collection('boards').get();
        const boardList = boardsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBoards(boardList);
      } catch (error) {
        console.error('Error fetching boards:', error);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div>
       <Header /> 
      <Typography variant="h5">Boards</Typography>
      <Button component={Link} to="/create-board" variant="contained" color="primary">
        Create New Board
      </Button>
      {boards.map(board => (
        <Card key={board.id} style={{ marginTop: '20px' }}>
          <CardContent>
            <Typography variant="h6">{board.name}</Typography>
            <Typography variant="body1">{board.description}</Typography>
            <Button component={Link} to={`/boards/${board.id}`} variant="outlined">
              View Board
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BoardsPage;
