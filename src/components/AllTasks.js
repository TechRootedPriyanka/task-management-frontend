import React, { useState, useEffect } from 'react';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        if (response.ok) {
          const tasksData = await response.json();
          console.log('Tasks Data:', tasksData); // Log tasks data to console
          setTasks(tasksData);
        } else {
          console.error("Failed to fetch tasks:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error.message);
      }
    };

    fetchTasks();
  }, []);

  console.log('Tasks:', tasks); // Log tasks state to console

  return (
    <>
      <Typography variant="h3">All Tasks</Typography>
      {tasks.length === 0 ? (
        <Typography>No tasks available</Typography>
      ) : (
        <List>
          {tasks.map((tasks) => (
            <ListItem key={tasks._id}>
              <ListItemText primary={tasks.taskName} />
              {/* Adjust primary text as per your Task schema */}
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
};

export default AllTasks;
