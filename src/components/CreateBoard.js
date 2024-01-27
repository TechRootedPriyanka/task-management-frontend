import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const CreateBoard = () => {
  const [boardName, setBoardName] = useState('');
  const userId = localStorage.getItem('userId');
  console.log(userId);
  const handleCreateBoard = async () => {
    try {
      // Make an API call to your backend to create a new board
      const response = await fetch('http://localhost:3000/boards', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN', // Include any authentication token if required
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomCode: boardName, userID: "65b54addaa828063dbf639ee" }),
      });

      if (response.ok) {
        // Board created successfully, you might want to handle the response
        console.log('Board created successfully');
        // Optionally, you can redirect the user or perform any other action
      } else {
        console.error('Failed to create board:', response.statusText);
        // Handle the error, show a message, or perform other actions
      }
    } catch (error) {
      console.error('Error during API call:', error.message);
      // Handle the error, show a message, or perform other actions
    }
  };

  return (
    <div>
      <Typography variant="h5">Create a New Board</Typography>
      <br /> <br />
      <form>
        <TextField
          label="Board Name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          required
        />
        <br />
        <br />
        <Button type="button" variant="contained" color="primary" onClick={handleCreateBoard}>
          Create Board
        </Button>
      </form>
    </div>
  );
};

export default CreateBoard;
