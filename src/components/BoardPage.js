// BoardPage.js

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./Header";

const BoardPage = () => {
  // Fetch board data based on the board ID from the route parameters
  const { boardId } = useParams();
  const [board, setBoard] = useState(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/rooms/${boardId}`);
        if (response.ok) {
          const boardData = await response.json();
          setBoard(boardData);
        } else {
          console.error("Failed to fetch board data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    fetchBoardData();
  }, [boardId]);

  return (
    <>
      <Header />
      <div>
        <h2>Board Details</h2>
        {board ? (
          <div>
            <p>Board Name: {board.roomCode}</p>
          </div>
        ) : (
          <p>Loading board data...</p>
        )}
      </div>
    </>
  );
};

export default BoardPage;
