
import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import Header from "./Header";
const BoardsPage = () => {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    // Fetch all boards data from the backend API
    const fetchBoards = async () => {
      try {
        const response = await fetch("http://localhost:3000/rooms", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const boardsData = await response.json();
          setBoards(boardsData);
        } else {
          console.error("Failed to fetch boards:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching boards:", error.message);
      }
    };

    fetchBoards();
  }, []); // Empty dependency array means this effect runs once after initial render

  return (
    <>
      <Header />
      <div>
        <Typography variant="h3">All Boards</Typography>
        {boards.length === 0 ? (
          <Typography>No boards available</Typography>
        ) : (
          <List>
            {boards.map((board) => (
              <ListItem key={board._id}>
                <ListItemText primary={board.roomCode} />
              </ListItem>
            ))}
          </List>
        )}
      </div>
      <Button
        component={Link}
        to="/create-board"
        variant="contained"
        color="primary"
      >
        Create New Board
      </Button>
    </>
  );
};

export default BoardsPage;
