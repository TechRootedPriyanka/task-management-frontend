// UsersPage.js

import React, { useState } from 'react';
import Header from './Header';
import { Typography, List, ListItem, ListItemText, Button } from '@mui/material';

const UsersPage = () => {
  // Define state to hold the list of users
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);

  // Function to fetch the list of users from your backend API
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Failed to fetch users:', response.statusText);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error.message);
    }
  };

  return (
    <>
      <Header />
      <div>
        <Typography variant="h3">Users</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            setShowUsers(true);
            fetchUsers();
          }}
        >
          Show All Users
        </Button>
        {showUsers && (
          <List>
            {users.map((user) => (
              <ListItem key={user._id}>
                <ListItemText primary={user.email} />
                <ListItemText primary={user.password} />
                <ListItemText primary={user.role} />
                <ListItemText primary={user._id} />
              </ListItem>
            ))}
          </List>
        )}
      </div>
    </>
  );
};

export default UsersPage;
