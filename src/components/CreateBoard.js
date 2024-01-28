import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import {jwtDecode} from 'jwt-decode';
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const CreateBoard = () => {
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;

  const handleCreateBoard = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomCode: boardName, userID: userId }),
      });

      if (response.ok) {
        console.log("Board created successfully");
        navigate("/boards");
      } else {
        console.error("Failed to create board:", response.statusText);
      }
    } catch (error) {
      console.error("Error during API call:", error.message);
    }
  };

  return (
    <>
      <Header />
      <div>
        <Typography variant="h5">Create a New Board</Typography>
        <br /> <br />
        <form onSubmit={handleCreateBoard}>
          <TextField
            label="Board Name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            required
          />
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary">
            Create Board
          </Button>
        </form>
      </div>
    </>
  );
};

export default CreateBoard;
