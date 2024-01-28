
// import React, { useState, useEffect } from "react";
// import { Typography, List, ListItem, ListItemText, Button } from "@mui/material";
// import { Link } from 'react-router-dom';
// import Header from "./Header";
// import {jwtDecode} from 'jwt-decode';

// const BoardsPage = () => {
//   const [boards, setBoards] = useState([]);
//   const token = localStorage.getItem("token");
//   const decodedToken = jwtDecode(token);
//   const userId = decodedToken.userId;

//   const handleCopyRoomCode = (roomCode) => {
//     navigator.clipboard.writeText(roomCode)
//       .then(() => {
//         console.log('Room code copied to clipboard');
//       })
//       .catch((error) => {
//         console.error('Error copying room code:', error);
//       });
//   }

//   useEffect(() => {
//     const fetchBoards = async () => {
//       try {
//         const response = await fetch("http://localhost:3000/rooms", {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });

//         if (response.ok) {
//           const boardsData = await response.json();
//           // Filter boards based on the current user's userID
//           const userBoards = boardsData.filter(board => board.userID === userId);
//           setBoards(userBoards);
//         } else {
//           console.error("Failed to fetch boards:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching boards:", error.message);
//       }
//     };

//     fetchBoards();
//   }, [userId]); // Include userId in the dependency array to refetch boards when userId changes

//   return (
//     <>
//       <Header />
//       <div>
//         <Typography variant="h3">Your Boards</Typography>
//         {boards.length === 0 ? (
//           <Typography>No boards available</Typography>
//         ) : (
//           <List>
//             {boards.map((board) => (
//               <ListItem key={board._id}>
//                 <ListItemText primary={board.roomCode} />
//                 <Button
//                   variant="outlined"
//                   onClick={() => handleCopyRoomCode(board.roomCode)}
//                 >
//                   Copy
//                 </Button>
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </div>
//       <Button
//         component={Link}
//         to="/create-board"
//         variant="contained"
//         color="primary"
//       >
//         Create New Board
//       </Button>
//     </>
//   );
// };

// export default BoardsPage;
import React, { useState, useEffect } from "react";
import { Typography, List, ListItem, ListItemText, Button } from "@mui/material";
import { Link } from 'react-router-dom';
import Header from "./Header";
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const BoardsPage = () => {
  const [boards, setBoards] = useState([]);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;
  const navigate = useNavigate();

  const handleCopyRoomCode = (roomCode) => {
    navigator.clipboard.writeText(roomCode)
      .then(() => {
        console.log('Room code copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying room code:', error);
      });
  }

  useEffect(() => {
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
          // Filter boards based on the current user's userID
          const userBoards = boardsData.filter(board => board.userID === userId);
          setBoards(userBoards);
        } else {
          console.error("Failed to fetch boards:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching boards:", error.message);
      }
    };

    fetchBoards();
  }, [userId]); // Include userId in the dependency array to refetch boards when userId changes

  const handleBoardClick = (boardId) => {
    // Navigate to the specific board page
    navigate(`/board/${boardId}`);
  };

  return (
    <>
      <Header />
      <div>
        <Typography variant="h3">Your Boards</Typography>
        {boards.length === 0 ? (
          <Typography>No boards available</Typography>
        ) : (
          <List>
            {boards.map((board) => (
              <ListItem key={board._id} onClick={() => handleBoardClick(board._id)}>
                <ListItemText
                  primary={<Link to={`/board/${board._id}`}>{board.roomCode}</Link>}
                />
                <Button
                  variant="outlined"
                  onClick={() => handleCopyRoomCode(board.roomCode)}
                >
                  Copy
                </Button>
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
